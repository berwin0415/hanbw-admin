import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getBookList, updateBook } from '../../api/books'
import PageBody from '../../components/Pagebody'
import { Button, Table, message } from 'antd'
import Helmet from 'react-helmet'
import { useDispatch } from 'react-redux'
import { SET_ARTICLE_PAGE } from '../../store/constants'

export default function Books({ history }) {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const getList = () => {
    setLoading(true)
    getBookList()
      .then((res) => {
        if (res.code === 1) {
          const { list = [] } = res.data || {}
          setList(list.map((item) => ({ ...item, key: item.bookId })))
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }
  useEffect(() => {
    getList()
  }, [])

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

  const handleFreez = (record) => {
    setLoading(true)
    updateBook({ bookId: record.key, status: record.status === 2 ? 1 : 2 })
      .then((res) => {
        if (res.code === 1) {
          message.success('更新成功')
          getList()
        }
      })
      .finally(() => {
        setLoading(false)
      })
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
        const status = record.status
        return (
          <div>
            <Button type="link" onClick={() => handleCheck(record)}>
              查看
            </Button>
            <Button type="link" onClick={() => handleFreez(record)}>
              {status === 2 ? '冻结' : '开始'}
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
        pagination={{ pageSize: 30 }}
      />
    </PageBody>
  )
}
Books.propTypes = {
  history: PropTypes.object,
}
