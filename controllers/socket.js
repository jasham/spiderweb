const router = require('express').Router()
const { server } = require('../server')
const io = require('socket.io')(server);

global.users = []

const action = async (req,res,next) => {
    await io.on("connection", function (socket) {
        global.socketNode = socket
        global.users.push({ userId : socket.id })
    })
}


router.get('/',action)


module.exports = router