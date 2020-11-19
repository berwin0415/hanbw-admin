import axios from 'axios'
import stroe from 'store'
import { goLogin } from '.'
import { TOKEN } from '../config'

const request = axios.create({
  timeout: 10000,
})

request.interceptors.request.use((config) => {
  const token = stroe.get(TOKEN)
  config.headers['x-csrf-token'] = token
  if (token) {
    config.headers.Authorization = token
  } else {
    goLogin()
  }
  return config
})

request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (err) => {
    if (err.response.status === 401) {
      goLogin()
    }
    return Promise.reject(err)
  }
)
const Ajax = {
  get: (url, params, options) => request.get(url, { params, ...options }),
  delete: (url, params, options) => request.delete(url, { params, ...options }),
  post: (url, data, options) => request.post(url, data, options),
  put: (url, data, options) => request.put(url, data, options),
}

export default Ajax
