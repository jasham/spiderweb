const express  = require('express')
const cors = require('cors')
const app = require('express')()
const http = require('http').createServer(app)

app.use(cors())

const io = require('socket.io')(http,{
	cors: {
	  origin: ["http://localhost:3000","http://localhost:3001"],
	  methods: ["GET", "POST"],
	  allowedHeaders: ["my-custom-header"],
	  credentials: true
	}
})

var routes = require('./routes/routes')
const port = process.env.PORT || 8080

app.use(express.json({ limit: "100mb" }))
app.use(express.urlencoded({ extended: false }))

app.use(routes);

app.io = io

http.listen(port, () => {
	console.log('listening on *:',port)
})