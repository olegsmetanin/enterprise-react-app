
import {Enum} from 'Core/API'

export const EUserRoles = Enum(
  'user',
  'admin'
)

export type EUserRoles = Enum<typeof EUserRoles>
