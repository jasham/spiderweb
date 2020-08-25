var express = require('express');
var routes = require('./routes/routes');
// const CryptoJS = require('crytpo-js');


app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);
// app.use(CryptoJS);

port = process.env.PORT || 8080;

app.listen(port,()=>{
    console.log('API server started on: ',port);
});

