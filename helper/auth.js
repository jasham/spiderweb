var jwt = require('jsonwebtoken');



CheckAuthentication=(req,res,next)=>{
 
}

Login = (req, res) => {
    const paylod = {
        _id,
        uid,
        email
    }
  const loginObj=  createNewToken(paylod);
}

Signup = (req, res) => {
    const paylod = {
        _id,
        uid,
        email
    }
  const loginObj=  createNewToken(paylod);
}

const createNewToken = (payload) => {
    const token = jwt.sign(payload, config.secret, { expiresIn: config.tokenLife });
    //const refreshToken = jwt.sign(payload, config.refreshTokenSecret);// it will save in db
    return { token, refreshToken };
}

module.exports = {
}