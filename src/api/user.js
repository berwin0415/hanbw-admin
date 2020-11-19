import request from '../utils/request'

const url = {
  getUserInfo: '/api/v1/user',
}

export const getUserInfo = (params) => request.get(url.getUserInfo, params)
