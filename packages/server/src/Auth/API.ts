import {Enum} from 'Core/API'

export const EProviderTypes = Enum(
  'facebook',
  'twitter',
  'instagram',
  'gmail',
  'github'
)

export type EProviderTypes = Enum<typeof EProviderTypes>
