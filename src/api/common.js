import request from '../utils/request'

const url = {
  login: '/api/v1/common/login',
  signup: '/api/v1/common/signup',
  validateUsername: '/api/v1/common/validateUsername',
}

export const postLogin = (params) => request.post(url.login, params)
export const postSignup = (params) => request.post(url.signup, params)
export const postValidateUsername = (params) =>
  request.post(url.validateUsername, params)
