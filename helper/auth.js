var jwt = require('jsonwebtoken')
const config = require('../helper/config')


checkAuthentication = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (authHeader) {
    const token = authHeader.split(' ')[1]// Bearer <token>
    jwt.verify(token, config.config.secret, async function (err, decoded) {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          // create new token
          let tokenObj = {
            _id: req.headers.user_id,
            uid: req.headers.uid
          }
          let newToken = await createNewToken(tokenObj)
          req.headers.authorization = newToken
        }

        else if (err.name === 'JsonWebTokenError') {
        }
      }
      next()
    })
  }
  else {
    return res.status(403).send({
      result: 'unauthorized',
      error: 'authentication error. token required.'
    })
  }
}

login = async (data) => {
  const token = await createNewToken(data)
  return token
}

signup = async (data) => {
  const token = await createNewToken(data)
  return token
}

const createNewToken = (payload) => {
  const token = jwt.sign(payload, config.config.secret, { expiresIn: config.config.tokenLife })
  //const refreshToken = jwt.sign(payload, config.refreshTokenSecret)// it will save in db
  return token
}

module.exports = {
  checkAuthentication,
  signup,
  login
}