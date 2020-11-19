import request from '../utils/request'

const url = {
  baseUrl: '/api/v1/tasks',
}

export const getTasksList = () => request.get(url.baseUrl)
export const postTask = (params) => request.post(url.baseUrl, params)
export const deleteTask = (taskId) =>
  request.put(`${url.baseUrl}/${taskId}`, { status: 1 })
export const updateTask = (params) => {
  const { taskId, ...rest } = params
  return request.put(`${url.baseUrl}/${taskId}`, rest)
}
