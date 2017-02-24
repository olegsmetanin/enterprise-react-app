import {IFluxAction} from 'Core/API'
import {
    GENERIC_TABLE_REQUEST
} from './GenericTableActionTypes'
import {
    EActionTypes
} from 'API'


const ACTION_HANDLERS = {
  [`${GENERIC_TABLE_REQUEST}${EActionTypes.BEGIN}`]: (
    state: {[key: string]: any},
    action: any
  ) => {
    const controlState = state[action.cid]
      return {
        ...state,
        [action.cid]: {...controlState, isLoading: true}
      }
  },
  [`${GENERIC_TABLE_REQUEST}${EActionTypes.SUCCESS}`]: (
    state: {[key: string]: any},
    action: IFluxAction<{value: string[]}>
  ) => {
      return {
        ...state,
        [action.cid]: {...action.payload, isLoading: false}
      }
  }
}

const initialState = {
}
export function genericTablesReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}