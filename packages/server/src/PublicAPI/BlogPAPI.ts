import * as _ from 'lodash'
import {
  inject,
  injectable
} from 'inversify'

import {Router} from 'express'
import * as express from 'express'
import {handleAsync} from 'express/handleAsync'

import {ETypes} from 'DI/ETypes'
import {BlogPostsFindAll} from 'Commands/Blog/BlogPostsFindAll'
import {BlogPostsCreate} from 'Commands/Blog/BlogPostsCreate'

@injectable()
export class BlogPAPI {

  @inject(ETypes.BlogPostsFindAll)
  private blogPostsFindAll: BlogPostsFindAll

  @inject(ETypes.BlogPostsCreate)
  private blogPostsCreate: BlogPostsCreate

  connect(app) {
    app.post('/blog/posts/findall', handleAsync(async (req, res) => {
        const text = req.body.text
        let blogPosts = await this.blogPostsFindAll
          .with({text})
          .execute()
        res.send(blogPosts)
    }))

    app.post('/blog/posts/create', handleAsync(async (req, res) => {
        const post = _.cloneDeep(req.body.post)
        console.log('req.user', req.user)
        post.user_id = req.user.id
        let blogPosts = await this.blogPostsCreate
          .with({post})
          .execute()
        res.send(blogPosts)
    }))


  }

}