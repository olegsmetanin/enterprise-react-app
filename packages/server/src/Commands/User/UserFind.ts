import {
  injectable,
  inject
} from 'inversify'
import {ICommand} from 'Core/API'
import {IDB} from 'DB/API'
import {ETypes} from 'DI/ETypes'
import {EProviderTypes} from 'Auth/API'


export interface IUserFindArgs {
  id?: string
  provider_user_id?: string,
  provider?: EProviderTypes
}

@injectable()
export class UserFind implements ICommand {

  @inject(ETypes.DB)
  private db: IDB

  args: IUserFindArgs

  with(args: IUserFindArgs) {
    this.args = args
    return this
  }

  async execute() {
    const db = this.db
    const {id, provider_user_id, provider} = this.args
    if (id) {
      return await db.oneOrNone(`SELECT * FROM users WHERE id = $1`, id)
    } else {
      return await db.oneOrNone(`SELECT * FROM users WHERE ${provider} = $1`, provider_user_id)
    }
  }
}
