import * as jwt from 'jsonwebtoken'

export class JWTMiddleware {
  middleware = (req, res, next) => {

    const headers = req.headers

    const isAuthenticated = !headers || !headers.authorization

    const token = isAuthenticated ? false : headers.authorization.replace('Bearer ', '')

    let payload = {}

    let validToken = false

    if (token) {
        try {
            payload = jwt.verify(token, process.env.TOKEN_SECRET);
            validToken = true;
        } catch (err) {
            payload = {};
            validToken = false;
            console.log(err);
        }
    }
    req.isAuthenticated = token.isAuthenticated;
    req.tokenPayload = payload;
    req.user = {
        _id: req.tokenPayload._id
    };

    next();
  }

}