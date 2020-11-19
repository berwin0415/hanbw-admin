import React from 'react'
import { renderRoutes } from 'react-router-config'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../store'
import routes from '../routes'
import history from './history'
import 'antd/dist/antd.css'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
import './index.scss'
moment.locale('zh-cn')

const store = createStore(rootReducer, applyMiddleware(thunk))
export default function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <Router history={history}>{renderRoutes(routes)}</Router>
      </Provider>
    </ConfigProvider>
  )
}
