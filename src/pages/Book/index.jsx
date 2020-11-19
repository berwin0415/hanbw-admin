import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { deleteArticle, getBookInfo } from '../../api/books'
import PageBody from '../../components/Pagebody'
import { Button, message, Modal, Table } from 'antd'
import { connect, useDispatch } from 'react-redux'
import { SET_ARTICLE_LIST } from '../../store/constants'
import Helmet from 'react-helmet'

const getTitle = (list) => {
  if (Array.isArray(list) && list.length) {
    return list[0].bookName || ''
  }
  return ''
}

addEventListener('popstate', (e) => {
  console.log(e)
})
export default connect((state) => ({ lists: state.articles.lists }))(Book)
function Book({ match, history, lists }) {
  const {
    params: { bookId },
  } = match
  if (!bookId) {
    history.go(-1)
    return null
  }
  const [data, setdata] = useState(0)
  const list = lists[bookId] || []
  const title = getTitle(list)
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  console.log(data)
  const getList = () => {
    setLoading(true)
    setdata(2)
    getBookInfo(bookId)
      .then((res) => {
        if (res.code === 1 && res.data) {
          const { list = [] } = res.data
          dispatch({
            type: SET_ARTICLE_LIST,
            payload: {
              id: bookId,
              data: list.map((item) => ({ ...item, key: item.id })),
            },
          })
        } else {
          message.error(res.message || '获取章节列表出错')
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }
  useEffect(() => {
    if (!list.length) {
      getList()
    }
  }, [])

  const handleCheck = (record) => {
    history.push(`/chapter/${record.key}`)
  }

  const handleDelete = (record) => {
    Modal.confirm({
      title: '确认删除？',
      content: `此操作不可恢复，确认删除？`,
      onOk() {
        return deleteArticle(record.key).then((res) => {
          if (res.code === 1) {
            message.success('删除成功')
            getList()
            return Promise.resolve()
          } else {
            message.error(res.message)
          }
        })
      },
    })
  }
  const columns = [
    {
      dataIndex: 'chapterName',
      title: '章节名称',
    },
    {
      dataIndex: 'order',
      title: '序号',
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
            <Button disabled type="link" style={{ color: 'lightgreen' }}>
              编辑
            </Button>
            <Button
              type="link"
              style={{ color: 'red' }}
              onClick={() => handleDelete(record)}
            >
              删除
            </Button>
          </div>
        )
      },
    },
  ]
  return (
    <PageBody title={title}>
      <Helmet>
        <title>{title}</title>
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
Book.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  lists: PropTypes.object,
}
