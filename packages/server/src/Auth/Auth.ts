import {
  inject,
  injectable
} from 'inversify'

import * as passport from 'passport'
import {Strategy as FacebookStrategy} from 'passport-facebook'

import {UserFind} from 'Commands/User/UserFind'
import {UserCreate} from 'Commands/User/UserCreate'

import {ETypes} from 'DI/ETypes'
import {IExec} from 'Core/API'
import {EProviderTypes} from 'Auth/API'

@injectable()
export class Auth {

  @inject(ETypes.exec)
  private exec: IExec

  @inject(ETypes.UserFind)
  private userFind: UserFind

  @inject(ETypes.UserCreate)
  private userCreate: UserCreate

  connect(app) {

    app.use(passport.initialize())
    app.use(passport.session())

    const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID
    const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET
    const DOMAIN = process.env.DOMAIN

    passport.use(new FacebookStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: '//' + DOMAIN + '/login/facebook/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
        // console.log('profile', profile)
        const provider_user_id = profile.id
        const provider = EProviderTypes.facebook
        let rsUser = await this.userFind
            .with({provider_user_id, provider})
            .execute()
        if (!rsUser) {
          const display_name = profile.displayName
          const user_id = await this.userCreate
            .with({display_name, provider_user_id, provider})
            .execute()
          rsUser = await this.userFind
            .with({id: user_id})
            .execute()
        }
        return done(null, rsUser)
    }))

    passport.serializeUser((user: any, done) => {
        done(null, user.id)
    })

    passport.deserializeUser(async (id: string, done) => {
        const rsUser = await this.userFind
            .with({id})
            .execute()
        done(null, rsUser)
    })

    app.get('/login/facebook', passport.authenticate('facebook'))

    app.get(
        '/login/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/login' }),
        (req, res) => {
            res.redirect('/qwe');
        }
    )

  }
}