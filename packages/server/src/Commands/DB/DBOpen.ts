import {
  injectable
} from 'inversify'
import {ICommand} from 'Core/API'

@injectable()
export class DBOpen implements ICommand {

  pgp: any
  DB_CONNECTION: any

  with(pgp, DB_CONNECTION) {
    this.pgp = pgp
    this.DB_CONNECTION = DB_CONNECTION
    return this
  }

  execute() {
    let db = this.pgp(this.DB_CONNECTION)
    return db
  }
}
