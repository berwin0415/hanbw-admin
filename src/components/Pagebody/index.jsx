import React, { useRef } from 'react'
import styles from './index.module.scss'
import PropTypes from 'prop-types'
import { Button, Divider } from 'antd'

export default function PageBody(props) {
  const { children, title, showGoButtom } = props
  const box = useRef(null)
  const handleGoBottom = () => {
    box.current.scrollTop = 10000000
  }
  return (
    <div className={styles.pageWrap} ref={box}>
      <div className={styles.page}>
        {title ? (
          <div className={styles.title}>
            {title}
            <Divider />
          </div>
        ) : null}
        {showGoButtom ? (
          <Button
            className={styles.goBottom}
            type="primary"
            onClick={handleGoBottom}
          >
            到底
          </Button>
        ) : null}
        {children}
      </div>
    </div>
  )
}

PageBody.propTypes = {
  children: PropTypes.any,
  showGoButtom: PropTypes.bool,
  title: PropTypes.string,
}
