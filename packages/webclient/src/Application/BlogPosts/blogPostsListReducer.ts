import {IBlogPostsListState} from './API'
import {IFluxAction} from 'Core/API'
import {
    BLOG_POSTS_LIST_REQUEST
} from './BlogPostsActionTypes'
import {
    EActionTypes
} from 'API'


const ACTION_HANDLERS = {
  [`${BLOG_POSTS_LIST_REQUEST}${EActionTypes.SUCCESS}`]: (
    state: {[key: string]: IBlogPostsListState},
    action: IFluxAction<IBlogPostsListState>
  ) => {
      return {
        ...state,
        [action.cid]: action.payload
      }
  }
}

const initialState = {
  list: null
}
export function blogPostsListReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}