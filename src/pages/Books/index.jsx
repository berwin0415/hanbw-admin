import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getBookList } from '../../api/books'
import PageBody from '../../components/Pagebody'
import { Button, Table } from 'antd'
import Helmet from 'react-helmet'

export default function Books({ history }) {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
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
  }, [])

  const handleCheck = (record) => {
    history.push(`/book/${record.key}`)
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
        pagination={{ pageSize: 30 }}
      />
    </PageBody>
  )
}
Books.propTypes = {
  history: PropTypes.object,
}
