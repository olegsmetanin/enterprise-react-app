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
import {Auth} from 'Auth/Auth'
import {UserFind} from 'Commands/User/UserFind'
import {UserCreate} from 'Commands/User/UserCreate'
import {BlogPostsFindAll} from 'Commands/Blog/BlogPostsFindAll'
import {BlogPostsCreate} from 'Commands/Blog/BlogPostsCreate'
import {BlogPAPI} from 'PublicAPI/BlogPAPI'

const execImpl: IExec = (command: ICommand) => {
  return command.execute()
}

export let container = new Container()
container.bind<IExec>(ETypes.exec).toFunction(execImpl)
container.bind<Auth>(ETypes.Auth).to(Auth)
container.bind<DBPoolOpen>(ETypes.DBPoolOpen).to(DBPoolOpen)
container.bind<DBOpen>(ETypes.DBOpen).to(DBOpen)
container.bind<UserFind>(ETypes.UserFind).to(UserFind)
container.bind<UserCreate>(ETypes.UserCreate).to(UserCreate)
container.bind<BlogPostsFindAll>(ETypes.BlogPostsFindAll).to(BlogPostsFindAll)
container.bind<BlogPostsCreate>(ETypes.BlogPostsCreate).to(BlogPostsCreate)
container.bind<BlogPAPI>(ETypes.BlogPAPI).to(BlogPAPI)


