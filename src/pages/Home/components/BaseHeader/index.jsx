import React, { useEffect, useState } from 'react'
import { Drawer, Layout, Menu } from 'antd'
import PropTypes from 'prop-types'
import {
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'
import styles from './index.module.scss'
import { combineClass } from '../../../../utils'
const { Header } = Layout

const COLLAPSED_WIDTH = 1024

export default function BaseHeader({ routes, history }) {
  const [collapsed, setCollapsed] = useState(
    document.documentElement.clientWidth <= COLLAPSED_WIDTH
  )
  const [open, setOpen] = useState(false)
  console.log(routes)
  useEffect(() => {
    const resize = () => {
      const clientWidth = document.documentElement.clientWidth
      if (clientWidth <= COLLAPSED_WIDTH && !collapsed) {
        setCollapsed(true)
      }
      if (clientWidth > COLLAPSED_WIDTH && collapsed) {
        setCollapsed(false)
      }
    }
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [collapsed])
  const handleToggle = () => {
    setOpen(true)
  }
  const handleMenuClick = (e) => {
    history.push(e.key)
    if (collapsed) {
      setOpen(false)
    }
  }
  const renderMenu = () => (
    <Menu
      mode={collapsed ? 'vertical' : 'horizontal'}
      theme={collapsed ? 'white' : 'dark'}
      onClick={handleMenuClick}
    >
      <Menu.Item key="/home" icon={<PieChartOutlined />}>
        首页
      </Menu.Item>
      <Menu.Item key="/books" icon={<DesktopOutlined />}>
        书架
      </Menu.Item>
      <Menu.Item key="/tasks" icon={<ContainerOutlined />}>
        任务
      </Menu.Item>
    </Menu>
  )
  return (
    <Header
      className={combineClass(
        styles.header,
        collapsed ? styles.mobileHeader : styles.pcHeader
      )}
    >
      {collapsed ? (
        <MenuUnfoldOutlined className={styles.trigger} onClick={handleToggle} />
      ) : (
        renderMenu()
      )}
      {collapsed ? (
        <Drawer
          title="导航"
          placement="left"
          closable={false}
          onClose={() => setOpen(false)}
          visible={open}
          key="left"
          bodyStyle={{ padding: 0 }}
        >
          {renderMenu()}
        </Drawer>
      ) : null}
    </Header>
  )
}

BaseHeader.propTypes = {
  routes: PropTypes.object,
  history: PropTypes.any,
}
