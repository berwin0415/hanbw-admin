import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { renderRoutes } from 'react-router-config'
// import { Layout, Menu } from 'antd'
// import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
// import styles from '../index.module.scss'
import { getUserInfo } from '../../../api/user'
import BaseHeader from './BaseHeader'
import Footer from './BaseFooter'

export default function Root({ route, history }) {
  const [userinfo, setUserinfo] = useState({})
  useEffect(() => {
    getUserInfo().then((res) => {
      if (res.code === 1) {
        setUserinfo(res.data)
        console.log(res.data, userinfo)
      }
    })
  }, [])
  // const handleMenuClick = (e) => {
  //   history.push(e.key)
  // }

  return (
    <>
      <BaseHeader routes={route.routes} history={history} />
      {renderRoutes(route.routes)}
      <Footer />
    </>
  )
  // return (
  //   <Layout className={styles.layout}>
  //     <Sider
  //       zeroWidthTriggerStyle={{ top: 11 }}
  //       breakpoint="lg"
  //       collapsedWidth="0"
  //       onBreakpoint={(broken) => {
  //         console.log(broken)
  //       }}
  //       onCollapse={(collapsed, type) => {
  //         console.log(collapsed, type)
  //       }}
  //     >
  //       <div className="logo" />
  //       <Menu
  //         theme="dark"
  //         mode="inline"
  //         defaultSelectedKeys={['/home']}
  //         onClick={handleMenuClick}
  //       >
  //         <Menu.Item key="/home" icon={<UserOutlined />}>
  //           首页
  //         </Menu.Item>
  //         <Menu.Item key="/books" icon={<VideoCameraOutlined />}>
  //           书架
  //         </Menu.Item>
  //         <Menu.Item key="/tasks" icon={<VideoCameraOutlined />}>
  //           任务
  //         </Menu.Item>
  //       </Menu>
  //     </Sider>
  //     <Layout>
  //       <Header style={{ padding: 0, backgroundColor: '#fff' }} />
  //       <Content
  //         style={{
  //           margin: '24px 16px 0',
  //           // overflow: 'scroll',
  //           height: 'auto',
  //         }}
  //       >
  //         {renderRoutes(route.routes)}
  //         <Footer></Footer>
  //       </Content>
  //     </Layout>
  //   </Layout>
  // )
}
Root.propTypes = {
  route: PropTypes.object,
  history: PropTypes.any,
}
