const router = require('express').Router()
const { server } = require('../server')
const io = require('socket.io')(server);

global.users = []

const action = async (req,res,next) => {
    console.log("Kela lelo")
    await io.on("connection", function (socket) {
        global.socketNode = socket
        global.users.push({ userId : socket.id })
        console.log("Here is sockets data",global.users)
    })
}


router.get('/',action)


module.exports = router