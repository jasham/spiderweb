const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, }).then(() => {
    console.log('db connected');
}).catch(err => {
    console.log(err);
});

module.exports = {
    user: require('../models/user'),
    service: require('../models/service'),
    image : require('../models/image') 
}