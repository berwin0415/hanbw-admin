import history from '../app/history'

export const goLogin = () => history.push('/login')

export const combineClass = (...classnames) =>
  classnames.filter((item) => item).join(' ')
