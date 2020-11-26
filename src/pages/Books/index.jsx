import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getBookList } from '../../api/books'
import PageBody from '../../components/Pagebody'
import { Button, Table } from 'antd'
import Helmet from 'react-helmet'
import { useDispatch } from 'react-redux'
import { SET_ARTICLE_PAGE } from '../../store/constants'

export default function Books({ history }) {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [pageNo, setPageNo] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const dispatch = useDispatch()
  const getList = () => {
    setLoading(true)
    getBookList({
      pageNo,
    })
      .then((res) => {
        if (res.code === 1) {
          const { list = [], total } = res.data || {}
          setList(list.map((item) => ({ ...item, key: item.bookId })))
          setTotal(total)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }
  useEffect(() => {
    getList()
  }, [pageNo, pageSize])

  const handleCheck = (record) => {
    dispatch({
      type: SET_ARTICLE_PAGE,
      payload: {
        id: record.key,
        pageNo: 1,
        pageSize: 10,
      },
    })
    history.push(`/book/${record.key}`)
  }

  const handleTableChange = (pagination) => {
    setPageNo(pagination.current)
    setPageSize(pagination.setPageSize)
  }

  const columns = [
    {
      dataIndex: 'bookName',
      title: '书籍名称',
    },
    {
      dataIndex: 'author',
      title: '作者',
    },
    {
      dataIndex: 'updatedTime',
      title: '更新时间',
    },
    {
      dataIndex: 'options',
      title: '操作',
      render(_, record) {
        return (
          <div>
            <Button type="link" onClick={() => handleCheck(record)}>
              查看
            </Button>
            <Button disabled type="link" style={{ color: 'red' }}>
              删除
            </Button>
          </div>
        )
      },
    },
  ]
  return (
    <PageBody title="书架">
      <Helmet>
        <title>书架</title>
      </Helmet>
      <Table
        loading={loading}
        dataSource={list}
        columns={columns}
        onChange={handleTableChange}
        pagination={{ pageSize, current: pageNo, total }}
      />
    </PageBody>
  )
}
Books.propTypes = {
  history: PropTypes.object,
}
