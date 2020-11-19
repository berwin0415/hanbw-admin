import { SET_ARTICLE_LIST } from '../constants'

const initState = {
  lists: {},
  details: {},
}

export const articles = (state = initState, action = {}) => {
  const { type, payload = {} } = action
  const { id, data } = payload
  switch (type) {
    case SET_ARTICLE_LIST:
      return {
        ...state,
        lists: {
          ...state.lists,
          [id]: data,
        },
      }

    default:
      return state
  }
}
