import {
  injectable,
  inject
} from 'inversify'
import {ICommand} from 'Core/API'
import {IDB} from 'DB/API'
import {ETypes} from 'DI/ETypes'

export interface IBlogPostsFindAllArgs {
  text?: string
}

@injectable()
export class BlogPostsFindAll implements ICommand {

  @inject(ETypes.DB)
  private db: IDB

  args: IBlogPostsFindAllArgs

  with(args: IBlogPostsFindAllArgs) {
    this.args = args
    return this
  }

  async execute() {
    const db = this.db
    const {text} = this.args
    if (text) {
      return await db.manyOrNone(`SELECT * FROM blog_posts WHERE title LIKE $1`, '%' + text + '%')
    } else {
      return []
    }
  }
}
