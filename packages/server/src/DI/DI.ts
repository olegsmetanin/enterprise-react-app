import 'reflect-metadata'
import {
  Container, injectable, inject,
  named, tagged, multiInject,
  unmanaged, optional
} from 'inversify'
import {ICommand, IExec} from 'Core/API'
import {ETypes} from './ETypes'
import {DBPoolOpen} from 'Commands/DB/DBPoolOpen'
import {DBOpen} from 'Commands/DB/DBOpen'

const execImpl: IExec = (command: ICommand) => {
  return command.execute()
}

export let container = new Container()
container.bind<IExec>(ETypes.exec).toFunction(execImpl)
container.bind<DBPoolOpen>(ETypes.DBPoolOpen).to(DBPoolOpen)
container.bind<DBOpen>(ETypes.DBOpen).to(DBOpen)