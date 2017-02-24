import {
  injectable,
  inject
} from 'inversify'
import {ICommand} from 'Core/API'
import {IDB} from 'DB/API'
import {ETypes} from 'DI/ETypes'
import {EUserRoles} from 'Security/API'
import {EProviderTypes} from 'Auth/API'
import {v4 as uuidV4} from 'uuid'

export interface IUserCreateArgs {
  display_name: string
  provider_user_id: string
  provider: EProviderTypes
}

@injectable()
export class UserCreate implements ICommand {

  @inject(ETypes.DB)
  private db: IDB

  args: IUserCreateArgs

  with(args: IUserCreateArgs) {
    this.args = args
    return this
  }
  async execute() {
    const db = this.db
    const id = uuidV4()
    const role = EUserRoles.user
    const {display_name, provider, provider_user_id} = this.args
    const firstname = display_name
    const secondname = display_name
    await db.none(`
      INSERT INTO users(
        id, firstname, secondname, display_name, role_id, ${provider}
      ) values($1, $2, $3, $4, $5, $6)
    `, [id, firstname, secondname, display_name, role, provider_user_id]
    )
    return id
  }
}
