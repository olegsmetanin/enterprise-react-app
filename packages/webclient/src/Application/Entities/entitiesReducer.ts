import {IFluxAction} from 'Core/API'
import {
    ENTITIES_UPDATE
} from './EntitiesActionTypes'
import {
    EActionTypes
} from 'API'

export interface IEntitiesState {
  [name: string]: {[id: string]: any}
}

const ACTION_HANDLERS = {
  [ENTITIES_UPDATE]: (state: IEntitiesState, action: IFluxAction<IEntitiesState>) => {

    let entities = action.payload
    // console.log('entities update action', state, action)
    Object.keys(entities).forEach(name => {

      if (!state[name]) {
        state[name] = {}
      }

      Object.keys(entities[name]).forEach(id => {
        state[name][id] = Object.assign(
          {},
          state[name][id],
          entities[name][id],
          {isCompact: action['isCompact'] ? state[name][id] && state[name][id].isCompact : false}
        )
      })
    })
    // console.log('entities update state', state)
    return state
  }
}

const initialState = {
}
export function entitiesReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}