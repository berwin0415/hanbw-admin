import request from '../utils/request'

const url = {
  baseBooksUrl: '/api/v1/books',
  baseArticle: '/api/v1/articles',
}

export const getBookList = (values) => request.get(url.baseBooksUrl, values)
export const getBookInfo = (bookId) =>
  request.get(`${url.baseBooksUrl}/${bookId}`)
export const updateBook = (params) => {
  const { bookId, ...rest } = params
  return request.put(`${url.baseBooksUrl}/${bookId}`, rest)
}
export const deleteBook = (id) =>
  request.put(`${url.baseBooksUrl}/${id}`, { status: 0 })

export const deleteArticle = (id) =>
  request.put(`${url.baseArticle}/${id}`, { status: 0 })
export const getChapterInfo = (id) => request.get(`${url.baseArticle}/${id}`)
