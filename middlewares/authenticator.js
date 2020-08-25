const jwt = require('jsonwebtoken');

exports.authenticator = (req, res, next)=>{
    try {
        token = req.headers['x-access-token']
        let userDetails = jwt.verify(token, 'spiderWebMaker')
        req.auth = userDetails;
        next();

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message:'Unauthorized'
        })
    }
    
    
}

