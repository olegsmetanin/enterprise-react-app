import {Router} from 'express'
import * as express from 'express'
import {handleAsync} from 'express/handleAsync'
export class API {

  connect(app) {
    app.get('/qwe', handleAsync(async (req, res) => {

        // res.cookie('jwt', jwt.token, {
        //   expires  : new Date(Date.now() + 9999999),
        //   httpOnly : true
        // });
        const resp1 = await this.get('1')
        const resp2 = JSON.stringify(req.user)
        //console.log('req',req)
        res.send(resp1 + ' ' + req.isAuthenticated() + ' ' + resp2)
    }))

  }

  get = async (id: string) => {
    return id
  }

}


