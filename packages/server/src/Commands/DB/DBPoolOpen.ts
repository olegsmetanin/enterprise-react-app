import {
  injectable
} from 'inversify'
import {ICommand} from 'Core/API'
import * as pgPromise from 'pg-promise'

@injectable()
export class DBPoolOpen implements ICommand {

  execute() {
    let pgp = pgPromise()
    return pgp
  }
}
