import {
  injectable,
  inject
} from 'inversify'
import {ICommand} from 'Core/API'
import {IDB} from 'DB/API'
import {ETypes} from 'DI/ETypes'
import {IBlogPost} from 'API'

export interface IBlogPostsCreateArgs {
  post: IBlogPost
}

@injectable()
export class BlogPostsCreate implements ICommand {

  @inject(ETypes.DB)
  private db: IDB

  args: IBlogPostsCreateArgs

  with(args: IBlogPostsCreateArgs) {
    this.args = args
    return this
  }

  async execute() {
    const db = this.db
    const {post} = this.args

    if (post) {
      return await db.none(`
        INSERT INTO blog_posts (
          title, content, user_id, published_date, status
        ) values($1, $2, $3, $4, $5) returning id
      `, [
        post.title,
        post.content,
        post.user_id,
        post.published_date,
        post.status
      ])
    } else {
      return null
    }
  }
}
