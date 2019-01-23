const express = require('express')
const User = require('./user')
const app = express()

app.use('/user', User)

app.listen(9000, function () {
    console.log('Node server at 9000 port')
})