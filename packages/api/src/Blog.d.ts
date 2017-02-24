export interface IBlogPost extends IBlogPostCreateRequest {
  id: number
  title: string
  desc: string
  content: string
  user_id?: string
  published_date: string
  status: string
  created_at?: string
  updated_at?: string
}

export interface IBlogPostCreateRequest {
  title: string
  content: string
  published_date: string
  status: string
}
