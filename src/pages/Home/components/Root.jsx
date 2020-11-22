import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { renderRoutes } from 'react-router-config'
import { getUserInfo } from '../../../api/user'
import BaseHeader from './BaseHeader'
import Footer from './BaseFooter'

export default function Root({ route, history }) {
  const [userinfo, setUserinfo] = useState({})
  useEffect(() => {
    getUserInfo().then((res) => {
      if (res.code === 1) {
        setUserinfo(res.data)
        console.log(userinfo)
      }
    })
  }, [])
  return (
    <>
      <BaseHeader routes={route.routes} history={history} />
      {renderRoutes(route.routes)}
      <Footer />
    </>
  )
}
Root.propTypes = {
  route: PropTypes.object,
  history: PropTypes.any,
}
