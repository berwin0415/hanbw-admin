import request from '../utils/request'

const url = {
  getBookList: '/api/v1/books',
  getBookInfo: '/api/v1/book/',
  baseArticle: '/api/v1/articles',
}

export const getBookList = () => request.get(url.getBookList)
export const getBookInfo = (bookId) => request.get(url.getBookInfo + bookId)

export const deleteArticle = (id) =>
  request.put(`${url.baseArticle}/${id}`, { status: 1 })
export const getChapterInfo = (id) => request.get(`${url.baseArticle}/${id}`)
