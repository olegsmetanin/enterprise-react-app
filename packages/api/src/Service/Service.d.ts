
export interface BlogPost {
  id: string
}

export interface Response<T> {
  payload: T
  warning?: any
  error?: boolean
}

export interface ResponseError {
  global: string
  fields: {[key: string]: string}
}

export interface BlogService {
  get: (id: string) => Promise<Response<BlogPost | ResponseError>>
}