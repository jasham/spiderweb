const mongoose = require('mongoose');

const main = (req,res,next) => {
    if(mongoose.connection.readyState === 0 ){
        return res.status(401).json({ status : "DB connection issue"});
    }else if(mongoose.connection.readyState === 1){
        next()
    }else{
        return res.status(500).json({ status : "DB is connecting"});
    }
}

module.exports = { main }
        
            