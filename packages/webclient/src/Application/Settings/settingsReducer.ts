import {IFluxAction} from 'Core/API'
import {ISettings} from './API'
import {
    SETTINGS_REQUEST
} from './SettingsActionTypes'
import {
    EActionTypes
} from 'API'

const ACTION_HANDLERS = {
  [`${SETTINGS_REQUEST}${EActionTypes.SUCCESS}`]: (state: ISettings, action: IFluxAction<ISettings>) => {
    return Object.assign({}, state, action.payload)
    // return ({
    //   ...state,
    //   ...action.payload
    // })
  }
}

const initialState = {
  me: null,
  config: null
}
export function settingsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
