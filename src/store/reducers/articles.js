import produce from 'immer'
import { isNumber } from '../../utils'
import { SET_ARTICLE_LIST, SET_ARTICLE_PAGE } from '../constants'

const initPageConfig = {
  pageNo: 1,
  pageSize: 10,
  total: 0,
}
const initState = {
  lists: {},
  details: {},
}

export const articles = produce(function (draft = initState, action = {}) {
  const { type, payload = {} } = action
  if (type === SET_ARTICLE_LIST) {
    const { id, data, total } = payload
    draft.lists[id] = {
      list: data,
      pageConfig: { ...initPageConfig, total: total || data.length },
    }
  } else if (type === SET_ARTICLE_PAGE) {
    const { id, pageNo, pageSize, total } = payload
    if (id && draft.lists[id]) {
      isNumber(pageNo) && (draft.lists[id].pageConfig.pageNo = pageNo)
      isNumber(pageSize) && (draft.lists[id].pageConfig.pageSize = pageSize)
      isNumber(total) && (draft.lists[id].total = total)
    }
  }
  return draft
})
