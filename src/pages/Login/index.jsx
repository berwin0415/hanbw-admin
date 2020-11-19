import React, { useState } from 'react'
import { Form, Button, message, Modal } from 'antd'
import PropTypes from 'prop-types'

import { postLogin, postSignup } from '../../api/common'
import store from 'store'
import { TOKEN } from '../../config'
import styels from './index.module.scss'
import CustomForm from './Form'

const Login = ({ history }) => {
  const [loginLoading, setLoginLoading] = useState(false)
  const [signupLoading, setSignupLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [loginForm] = Form.useForm()
  const [signupForm] = Form.useForm()
  const handleLogin = () => {
    loginForm
      .validateFields()
      .then((values) => {
        setLoginLoading(true)
        postLogin(values)
          .then((res) => {
            if (res.code === 1) {
              store.set(TOKEN, res.data.token)
              history.push('/')
            } else {
              message.error(res.message)
            }
          })
          .finally(() => {
            setLoginLoading(false)
          })
      })
      .catch((err) => console.log(err))
  }

  const handleSignup = () => {
    setVisible(true)
  }

  const handleSignupOk = () => {
    signupForm
      .validateFields()
      .then((values) => {
        setSignupLoading(true)
        postSignup(values)
          .then((res) => {
            if (res.code === 1) {
              store.set(TOKEN, res.data.token)
              history.push('/')
            } else {
              message.error(res.message)
            }
          })
          .finally(setSignupLoading(false))
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className={styels.login}>
      <CustomForm form={loginForm}>
        <Button
          type="primary"
          htmlType="submit"
          style={{ marginRight: 20 }}
          loading={loginLoading}
          onClick={handleLogin}
        >
          登录
        </Button>
        <Button type="primary" onClick={handleSignup}>
          注册
        </Button>
      </CustomForm>
      <Modal
        title="注册"
        visible={visible}
        onOk={handleSignupOk}
        confirmLoading={signupLoading}
        onCancel={() => setVisible(false)}
      >
        <CustomForm form={signupForm} mode="signup" />
      </Modal>
    </div>
  )
}

Login.propTypes = {
  history: PropTypes.any,
}
export default Login
