import {Enum} from 'Core/API'

export const ETypes = Enum(
  'exec',
  'DBPoolOpen',
  'DBOpen'
)

export type ETypes = Enum<typeof ETypes>
