import * as path from 'path'
import * as http from 'http'
import * as express from 'express'
import * as webpack from 'webpack'
import * as webpackDevMiddleware from 'webpack-dev-middleware'
import * as proxy from 'http-proxy-middleware'

let app = express()

const serverPort = 8181;

let config = require('./webpack.config')

config.watch = true

const compiler = webpack(config);

let webpackDevMiddlewareInstance = webpackDevMiddleware(compiler);

// let webpackDevMiddlewareInstance = webpackDevMiddleware(compiler, {
//   noInfo: false,
//   quiet: false,
//   lazy: true,
//   watchOptions: {
//     aggregateTimeout: 300,
//     poll: true,
//   },
//   publicPath: '/',
//   index: 'index.html',
//   headers: {
//     'X-Custom-Header': 'yes'
//   },
//   stats: {
//     colors: true,
//   },
//   reporter: null,
//   serverSideRender: false,
// });

app.use(webpackDevMiddlewareInstance);

app.use(express.static(path.resolve(__dirname, './public')))

app.use(express.static(path.resolve(__dirname, './dist')))

app.use(proxy('/', {
  changeOrigin: true,
  // pathRewrite: { "^/api/": "/" },
  target: "http://localhost:8180",
}))

http.createServer(app).listen(serverPort, function() {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
});