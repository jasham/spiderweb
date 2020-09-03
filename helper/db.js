
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, })
    .then(() => {
        console.log('db connected');
    }).catch(err => {
        console.log(err,"hello 1998");
    });
module.exports = {
    user: require('../models/user'),
    service: require('../models/service'),
    image : require('../models/image'),
    category : require('../models/category'),
    sub_category : require('../models/sub_category')
}