import * as _ from 'lodash'
import {
    IHTTPClient
} from 'Core/API'
import {delay} from 'Utils/delay'

import {IBlogPostsService} from './API'


const entities = {
  posts: {
    '1': {
      id: '1',
      title: 'string',
      desc: 'string',
      content: 'string',
      user_id: 'string',
      published_date: 'string',
      status: 'string',
      created_at: 'string',
      updated_at: 'string'
    },
    '2': {
      id: '2',
      title: 'string',
      desc: 'string',
      content: 'string',
      user_id: 'string',
      published_date: 'string',
      status: 'string',
      created_at: 'string',
      updated_at: 'string'
    }
  }
}


export class BlogPostsService implements IBlogPostsService {

  constructor(private httpClient: IHTTPClient) {
  }

  getAll(query: any) {
    let value = query.ids
    const posts = value
      .map(id => ({[id + '']: _.clone(entities.posts[id])}))
    const res = {
      value: value,
      entities: {
        posts_listview: Object.assign({}, ...posts)
      }
    }
    console.log('getAll', res)
    return delay(res, 1000)
  }
  get(eid: string) {
    const value = entities.posts[eid]
    return delay({
      value: value ? value.id + '' : null,
      entities: {
        posts: value ? ({
          [value.id]: _.clone(value)
        }) : {},
        posts_listview: value ? ({
          [value.id]: _.clone(value)
        }) : {},
      }
    }, 1000)
  }
}