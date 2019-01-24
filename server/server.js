const express = require('express')
const User = require('./user')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/user', User)

app.listen(9000, function () {
    console.log('Node server at 9000 port')
})