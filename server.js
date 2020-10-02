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
//app.use('/images', express.static(__dirname + '/uploads'));
// global.users = []
// app.io = io
server.listen(port,()=>{
    console.log('API server started on: ',port)
});


// io.on("connection", function (socket) {
//     global.socketNode = socket
//     global.users.push({ userId : socket.id })
//     console.log("Here is sockets data",global.users)
// })

// app.get("/socket",function(req,res){ 
//     console.log("Ninja")  
//     global.io = io;
//     global.io.on("connection", function (socket) {
//         global.socketNode = socket
//         global.users.push({ userId : socket.id })
//         console.log("Here is sockets data",global.users)
//     })
// })








