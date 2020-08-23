var express = require('express');
var routes = require('./routes/routes')

app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

port = process.env.PORT || 8080;

app.listen(port,()=>{
    console.log('API server started on: ',port);
});

