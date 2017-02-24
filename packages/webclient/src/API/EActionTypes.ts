import {Enum} from 'Core/API'

export const EActionTypes = Enum(
  'BEGIN',
  'SUCCESS',
  'FAIL'
)

export type EActionTypes = Enum<typeof EActionTypes>