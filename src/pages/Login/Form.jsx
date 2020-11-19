import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'
import styels from './index.module.scss'
// import { debounce } from 'lodash'
import { postValidateUsername } from '../../api/common'
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
}
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
}
export default function LoginForm({ children, form, mode }) {
  const isSignup = mode === 'signup'
  console.log(isSignup)
  return (
    <Form
      form={form}
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      className={styels.form}
    >
      <Form.Item
        label="用户名"
        name="username"
        hasFeedback={isSignup}
        rules={[
          {
            required: true,
            message: '请输入用户名!',
          },
          {
            validator(rule, value) {
              if (isSignup && value) {
                return postValidateUsername({ username: value }).then((res) => {
                  if (res.code === 1) {
                    return res.data.result === 1
                      ? Promise.resolve()
                      : Promise.reject('该用户已存在')
                  }
                  return Promise.reject(res.message)
                })
              }
              return Promise.resolve()
            },
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...tailLayout}>{children}</Form.Item>
    </Form>
  )
}
LoginForm.propTypes = {
  children: PropTypes.any,
  form: PropTypes.any.isRequired,
  mode: PropTypes.string,
}
