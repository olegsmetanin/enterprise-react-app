import * as passport from 'passport'
import {Strategy as FacebookStrategy} from 'passport-facebook'

export class Auth {

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
    (accessToken, refreshToken, profile, done) => {
        console.log('profile', profile)
        return done( null, profile );
    }))

    passport.serializeUser((user: any, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        done(null, {id: id, qwe:'qwe'})
        // User.findById(id, function(err, user) {
        //     done(err, user)
        // }
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