import {Enum} from 'Core/API'

export const ETypes = Enum(
  'DB',
  'exec',
  'Auth',
  'DBPoolOpen',
  'DBOpen',
  'UserFind',
  'UserCreate',
  'BlogPostsFindAll',
  'BlogPAPI',
  'BlogPostsCreate'
)

export type ETypes = Enum<typeof ETypes>
