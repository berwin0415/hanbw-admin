import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getChapterInfo } from '../../api/books'
import PageBody from '../../components/Pagebody'
import Helmet from 'react-helmet'
import styles from './index.module.scss'
import { Button } from 'antd'

export default function ChapterId({ match, history }) {
  const {
    params: { chapterId },
  } = match
  if (!chapterId) {
    history.go(-1)
    return null
  }
  const [state, setState] = useState({ content: [] })
  useEffect(() => {
    getChapterInfo(chapterId).then((res) => {
      if (res.code === 1) {
        setState({
          ...state,
          bookId: res.data.bookId,
          title: res.data.chapterName,
          content: res.data.content.split('\n'),
          next: res.data.next,
          prev: res.data.prev,
        })
      }
    })
  }, [chapterId])
  const handleGoPrev = () => {
    document.documentElement.scrollTop = 0
    history.push(`/chapter/${state.prev}`)
  }
  const handleGoIndex = () => {
    document.documentElement.scrollTop = 0
    history.push(`/book/${state.bookId}`)
  }
  const handleGoNext = () => {
    document.documentElement.scrollTop = 0
    history.push(`/chapter/${state.next}`)
  }
  return (
    <PageBody title={state.title}>
      <Helmet>
        <title>{state.title}</title>
      </Helmet>
      {state.content.map((item, i) => (
        <p key={i}>{item}</p>
      ))}
      <div className={styles.footer}>
        <Button
          className={styles.btn}
          disabled={!state.prev}
          onClick={handleGoPrev}
          type="primary"
        >
          上一页
        </Button>
        <Button className={styles.btn} onClick={handleGoIndex} type="primary">
          目录
        </Button>
        <Button
          className={styles.btn}
          disabled={!state.next}
          type="primary"
          onClick={handleGoNext}
        >
          下一页
        </Button>
      </div>
    </PageBody>
  )
}
ChapterId.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
}
