const express = require('express')
const UserRouter = require('./user')
const ChatRouter = require('./chat')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const model = require('./model')
const Chat = model.getModel('chat')

io.on('connection', function (socket) {
    socket.on('sendmsg', function (data) {
        console.log(data)
        const {
            from,
            to,
            msg
        } = data
        const chatid = [from, to].sort().join('_')
        Chat.create({
            chatid,
            from,
            to,
            content: msg,
            create_time: new Date().getTime()
        }, function (err, doc) {
            console.log(doc)
            io.emit('recvmsg', Object.assign({}, doc._doc))
        })
        io.emit('revcmsg', data)
    })
})

app.use(bodyParser.json())
app.use(cookieParser())
app.use('/user', UserRouter)
app.use('/chat', ChatRouter)
server.listen(9000, function () {
    console.log('Node server at 9000 port')
})