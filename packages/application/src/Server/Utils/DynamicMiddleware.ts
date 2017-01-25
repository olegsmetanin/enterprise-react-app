export class DynamicMiddleware {

  _middleware: any
  setMiddleware(middleware: any) {
    this._middleware = middleware
  }

  handler = (req, res, next) => {
    return this._middleware(req, res, next)
  }
}