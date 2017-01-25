import * as path from 'path'
import * as http from 'http'
import * as express from 'express'
import {API} from './REST'

let app = express()

const serverPort = 8180;

app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.static(path.resolve(__dirname, '../../dist/WebClient')))

app.use(API)

http.createServer(app).listen(serverPort, function() {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
});