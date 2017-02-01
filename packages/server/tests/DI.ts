import 'reflect-metadata'
import {
  Container, injectable, inject,
  named, tagged, multiInject,
  unmanaged, optional
} from 'inversify'

import {Enum} from 'Core/API'

export interface ICommand {
  params?(...args: any[])
  execute<T>(): T
}

export const EDIType = Enum("Executor")

export type EDIType = Enum<typeof EDIType>

let container = new Container()

interface IExec {
  <T>(command: ICommand): T;
}

const execImpl: IExec = (command: ICommand) => {
  return command.execute()
}

@injectable()
class Command1 implements ICommand {

  @inject('exec')
  private _exec: IExec

  execute() {
    console.log('Command1', this._exec)
  }
}

@injectable()
class Command2 implements ICommand {

  @inject('exec')
  private _exec: IExec

  q: any = null

  params(q: any) {
    this.q = q
  }

  execute() {
    console.log('Command2', ' ', this.q)
    console.log('Executor', this._exec)
    let command1 = container.get<Command1>('Command1')
    this._exec(command1)
  }
}


container.bind<IExec>('exec').toFunction(execImpl)
container.bind<Command1>('Command1').to(Command1)
container.bind<Command2>('Command2').to(Command2)

let exec = container.get<IExec>('exec')
let command2 = container.get<Command2>('Command2')
command2.params('qwe')
let command3 = container.get<Command2>('Command2')
exec(command2)
exec(command3)
