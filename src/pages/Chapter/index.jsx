import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getChapterInfo } from '../../api/books'
import PageBody from '../../components/Pagebody'
import Helmet from 'react-helmet'

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
          title: res.data.chapterName,
          content: res.data.content.split('\n'),
        })
      }
    })
  }, [])

  return (
    <PageBody title={state.title}>
      <Helmet>
        <title>{state.title}</title>
      </Helmet>
      {state.content.map((item, i) => (
        <p key={i}>{item}</p>
      ))}
    </PageBody>
  )
}
ChapterId.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
}
