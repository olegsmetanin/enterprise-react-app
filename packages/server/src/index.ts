import * as path from 'path'
import * as http from 'http'
import * as express from 'express'
import * as session from 'express-session'
import * as cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'
import * as lusca from 'lusca'
import * as dotenv from 'dotenv'
import {JWTMiddleware} from 'express/JWTMiddleware'
import {BlogPAPI} from 'PublicAPI/BlogPAPI'
import {Auth} from 'Auth/Auth'
import {container} from 'DI/DI'
import {ETypes} from 'DI/ETypes'
import {IExec, ICommand} from 'Core/API'
import {IDB} from 'DB/API'
import {DBOpen} from 'Commands/DB/DBOpen'
import {DBPoolOpen} from 'Commands/DB/DBPoolOpen'
import {handleAsync} from 'express/handleAsync'

dotenv.config({
  path: '.env'
})

const SERVER_PORT = process.env.SERVER_PORT
const SESSION_SECRET = process.env.SESSION_SECRET

let app = express()

app.use(cookieParser(SESSION_SECRET))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(session({
  name: 'session',
  proxy: true,
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true
  }
}))

let exec = container.get<IExec>(ETypes.exec)

let dbPoolOpen = container.get<DBPoolOpen>(ETypes.DBPoolOpen)
let pgp = exec(dbPoolOpen)

const DB_CONNECTION = process.env.DB_CONNECTION

let dbOpen = container.get<DBOpen>(ETypes.DBOpen).with(pgp, DB_CONNECTION)

let db = exec<IDB>(dbOpen)

container.bind<IDB>(ETypes.DB).toConstantValue(db)

let auth = container.get<Auth>(ETypes.Auth)
auth.connect(app)

app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));

// console.log(db)

// global.di = 'qwe'
// app.use((req, res, next) => {
//   if (req.user) {
//     res.cookie('un', 'asd', {httpOnly: true, signed: true})
//   }
//   next()
// })

//app.use(express.static(path.resolve(__dirname, 'public')))
//app.use(express.static(path.resolve(__dirname, '../node_modules/')))

const blogPAPI = container.get<BlogPAPI>(ETypes.BlogPAPI)
blogPAPI.connect(app)

app.get('/qwe', handleAsync(async (req, res) => {
    const resp = JSON.stringify(req.user)
    res.send(resp)
}))


http.createServer(app).listen(SERVER_PORT, function() {
    console.log('Your server is listening on port %d (http://localhost:%d)', SERVER_PORT, SERVER_PORT)
})