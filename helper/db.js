
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/MyApp', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, })
    .then(() => {
        console.log('db connected');
    }).catch(err => {
        console.log(err, "hello 1998");
    });

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
    user: require('../models/user'),
    service: require('../models/service'),
    image: require('../models/image'),
    category: require('../models/category'),
    sub_category: require('../models/sub_category')
}