import React, { useEffect, useState } from 'react'
import { Button, Modal, Form, Input, message, Table } from 'antd'
import PropTypes from 'prop-types'
import {
  getTasksList,
  postTask,
  deleteTask,
  updateTask,
} from '../../api/spiderTasks'
import styles from './index.module.scss'
import PageBody from '../../components/Pagebody'

export default function SpiderTask() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [creating, setCreating] = useState(false)
  const [form] = Form.useForm()
  const getList = () => {
    setLoading(true)
    getTasksList()
      .then((res) => {
        if (res.code === 1) {
          const { list } = res.data
          setList(
            Array.isArray(list)
              ? list.map((item) => ({ ...item, key: item.id }))
              : []
          )
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }
  useEffect(() => {
    getList()
  }, [])

  const handleCreateClick = () => {
    setVisible(true)
  }

  const handleOkClick = () => {
    form
      .validateFields()
      .then((values) => {
        const { bookName } = values
        setCreating(true)
        postTask({ bookName })
          .then((res) => {
            if (res.code === 1) {
              message.success('创建成功')
              getList()
              setVisible(false)
              form.resetFields()
            } else {
              message.error(res.message)
            }
          })
          .finally(() => {
            setCreating(false)
          })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const updateTaskStatus = (targetStatus, record) => {
    const { id: taskId } = record
    setLoading(true)
    updateTask({ taskId, taskStatus: targetStatus })
      .then((res) => {
        if (res.code === 1) {
          getList()
        } else {
          message.error(res.message)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }
  const handlePause = (record) => {
    updateTaskStatus(2, record)
  }
  const handleFinish = (record) => {
    updateTaskStatus(1, record)
  }
  const handleStart = (record) => {
    updateTaskStatus(3, record)
  }
  const handleDelete = (record) => {
    Modal.warning({
      title: '确认删除？',
      content: `任务：${record.bookName} 一但删除将不可恢复，确认删除？`,
      onOk() {
        return deleteTask(record.id)
          .then((res) => {
            if (res.code === 1) {
              message.success('删除成功')
              getList()
              return Promise.resolve()
            } else {
              message.error(res.message)
            }
          })
          .catch((err) => {
            message.error(err.message)
          })
      },
    })
  }

  const handleCheck = () => {}

  const columns = [
    {
      dataIndex: 'bookName',
      title: '书籍名称',
    },
    {
      dataIndex: 'taskStatus',
      title: '任务状态',
      render(text) {
        switch (text) {
          case 1:
            return '已完成'
          case 2:
            return '中止'
          case 3:
            return '进行中'
          default:
            return '未知'
        }
      },
    },
    {
      dataIndex: 'createdAt',
      title: '创建时间',
    },
    {
      dataIndex: 'options',
      title: '操作',
      render(text, record) {
        const taskStatus = record.taskStatus
        const buttons = [
          {
            key: 'pause',
            title: '中止',
            allowStatus: [3],
            handler: handlePause,
          },
          {
            key: 'finish',
            title: '完成',
            allowStatus: [2, 3],
            handler: handleFinish,
          },
          {
            key: 'start',
            title: '启动',
            allowStatus: [1, 2],
            handler: handleStart,
          },
        ]
        return (
          <div>
            <Button onClick={() => handleCheck(record)} type="link">
              查看
            </Button>
            {buttons
              .filter((item) => item.allowStatus.includes(taskStatus))
              .map((item) => (
                <Button
                  type="link"
                  key={item.key}
                  onClick={() => item.handler(record)}
                >
                  {item.title}
                </Button>
              ))}
            <Button
              onClick={() => handleDelete(record)}
              type="link"
              style={{ color: 'red' }}
            >
              删除
            </Button>
          </div>
        )
      },
    },
  ]
  return (
    <PageBody>
      <div className={styles.pageOptions}>
        <Button type="primary" onClick={handleCreateClick}>
          新建任务
        </Button>
      </div>
      <Table loading={loading} dataSource={list} columns={columns}></Table>
      <Modal
        title="添加任务"
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleOkClick}
        okButtonProps={{
          loading: creating,
        }}
      >
        <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
          <Form.Item
            label="书籍名称"
            name="bookName"
            rules={[
              {
                required: true,
                message: '请输入书籍名称!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </PageBody>
  )
}
SpiderTask.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
}
