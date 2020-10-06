const express  = require('express')
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server)
const cors = require('cors')
var routes = require('./routes/routes')
const port = process.env.PORT || 8080

app.use(express.json({ limit: "100mb" }))
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(routes)
app.use(express.static('uploads'))
app.io = io
server.listen(port,()=>{
    console.log('API server started on: ',port)
});








