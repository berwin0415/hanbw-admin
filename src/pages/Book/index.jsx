import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { deleteArticle, getBookInfo } from '../../api/books'
import PageBody from '../../components/Pagebody'
import { Button, message, Modal, Table } from 'antd'
import { connect, useDispatch } from 'react-redux'
import { SET_ARTICLE_LIST, SET_ARTICLE_PAGE } from '../../store/constants'
import Helmet from 'react-helmet'

const getTitle = (list) => {
  if (Array.isArray(list) && list.length) {
    return list[0].bookName || ''
  }
  return ''
}

export default connect((state) => ({ lists: state.articles.lists }))(Book)
function Book({ match, history, lists }) {
  const {
    params: { bookId },
  } = match
  if (!bookId) {
    history.go(-1)
    return null
  }

  const data = lists[bookId] || []
  const dataList = data.list || []
  const pageConfig = data.pageConfig || {}
  const title = getTitle(data.list)
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  const getList = () => {
    setLoading(true)
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
    if (!dataList.length) {
      getList()
    }
  }, [])

  const handleTableChange = (pagination) => {
    dispatch({
      type: SET_ARTICLE_PAGE,
      payload: {
        id: bookId,
        pageNo: pagination.current,
        pageSize: pagination.pageSize,
      },
    })
  }

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
      dataIndex: 'order',
      title: '序号',
      width: 60,
    },
    {
      dataIndex: 'chapterName',
      title: '章节名称',
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
        onChange={handleTableChange}
        loading={loading}
        dataSource={dataList}
        columns={columns}
        pagination={{ ...pageConfig, current: pageConfig.pageNo }}
      />
    </PageBody>
  )
}
Book.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  lists: PropTypes.object,
}
