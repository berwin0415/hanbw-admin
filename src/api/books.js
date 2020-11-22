import request from '../utils/request'

const url = {
  baseBooksUrl: '/api/v1/books',
  baseArticle: '/api/v1/articles',
}

export const getBookList = () => request.get(url.baseBooksUrl)
export const getBookInfo = (bookId) =>
  request.get(`${url.baseBooksUrl}/${bookId}`)
export const updateBook = (params) => {
  const { bookId, ...rest } = params
  return request.put(`${url.baseBooksUrl}/${bookId}`, rest)
}

export const deleteArticle = (id) =>
  request.put(`${url.baseArticle}/${id}`, { status: 1 })
export const getChapterInfo = (id) => request.get(`${url.baseArticle}/${id}`)
