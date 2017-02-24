import {IHTTPClient} from './API'
import 'whatwg-fetch'
export class HTTPClient implements IHTTPClient {
  POST(url: string, body?: any) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
  }
}