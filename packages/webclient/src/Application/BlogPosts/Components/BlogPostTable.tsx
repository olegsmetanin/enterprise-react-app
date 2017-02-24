/* tslint:disable */
import * as React from 'react'
/* tslint:enable */
import {table} from 'Core/Components/GenericTable/table'
import {IBlogPostTableRow, IBlogPostQuery} from '../API'
import {BlogPostsActions} from './../BlogPostsActions'
import {BlogPostsService} from './../BlogPostsService'
import {HTTPClient} from 'Core/HTTPClient'
import {IBlogPost} from 'API'
import {BlogPostCard} from './BlogPostCard'

const row = ({
  value, entities, onSelect
}: {
  value: string, entities: any, onSelect: (id: string) => void
}) => {
  const post = entities.posts_listview[value + '']
  return (
    <tr>
      <td>{post.desc}</td>
      <td>{post.content}</td>
      <td>
        <button onClick={() => onSelect(value)}>Show</button>
      </td>
    </tr>
  )
}

const card = ({
  value, onHide
}: {
  value: string, onHide: (id: string) => void
}) => {
  // const post = entities.posts[value]
  return (
    <tr>
      <td colSpan={3}>
        <BlogPostCard cid={value} key={value} value={value}/>
        <button onClick={onHide.bind(value)}>Hide</button>
      </td>
    </tr>
  )
}

export const BlogPostTable = table<IBlogPostTableRow, IBlogPostQuery>({
  service: new BlogPostsService(new HTTPClient()),
  entitiesSelector: (values, entities) => {
    const posts = values
      .map(id => ({[id]: entities.posts_listview[id]}))
    return {
      posts_listview: Object.assign({}, ...posts)
    }
  },
  row,
  card
})