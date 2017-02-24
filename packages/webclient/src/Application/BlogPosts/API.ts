import {IBlogPost} from 'API'
export interface IBlogPostsService {

  getAll(query: any): Promise<IBlogPostsListResponse>

  get(eid: string): Promise<IBlogPostsItemResponse>
}

export interface IBlogPostsActions {

  getAll(query: any, cid: string): Promise<void>

  get(eid: string, cid: string): Promise<void>
}

export interface IBlogPostsItemState {
  value: string
}

export interface IBlogPostsListState {
  value: string[]
}

export interface IBlogPostsEntities {
  entities: {
    posts: {
      [eid: string]: IBlogPost
    },
    posts_listview: {
      [eid: string]: IBlogPost
    }
  }
}

export interface IBlogPostsItemResponse extends IBlogPostsItemState, IBlogPostsEntities {
}

export interface IBlogPostsListResponse extends IBlogPostsListState, IBlogPostsEntities {
}

export interface IBlogPostTableRow extends IBlogPost {

}

export interface IBlogPostQuery {
  id: string
}