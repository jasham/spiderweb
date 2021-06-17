const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/MyApp' , { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, })
    .then(() => {
        console.log('db connected');
    }).catch(err => {
        console.log(err, "hello 1998");
    })

 
const main = (req, res, next) => {
    if (mongoose.connection.readyState === 0) {
        return res.status(503).json({ result: "dbFailed", error: 'DB connection issue' });
    } else if (mongoose.connection.readyState === 1) {
        next()
    } else {
        return res.status(503).json({ result: "dbProcessing", error: 'DB connection issue' });
    }
}

module.exports = {
    main,
    credential: require('../models/credential'),
    user: require('../models/user'),
    vendor: require('../models/vendor'),
    service: require('../models/service'),
    image: require('../models/image'),
    category: require('../models/category'),
    sub_category: require('../models/sub_category'),
    group: require('../models/group'),
    image: require('../models/image'),
    vendor_group: require('../models/vendor_group'),
    booking : require('../models/booking'),
    booking_service : require('../models/booking_service'),
    address : require('../models/address'),
    otpLog : require('../models/otp_log'),
    notification : require('../models/notification'),
    user_fcm_token : require('../models/user_fcm_token'),
    vendor_fcm_token : require('../models/vendor_fcm_token')
}