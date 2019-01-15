const express = require('express')

const app = express()
const mongoose = require('mongoose')

const DB_URL = 'mongodb://localhost:27017/imooc'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function () {
    console.log('--------- mongodb connected ----------')
})
const User = mongoose.model('user', new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    }
}))

// User.create({
//     user: 'chenzizhao',
//     age: 18
// }, function (err, doc) {
//     if (!err) {
//         console.log(doc)
//         return
//     }
//     console.log(err)
// })

app.get('/', function (req, res) {
    res.send('<h1>Start</h1>')
})

app.get('/data', function (req, res) {
    User.findOne({
        user: 'chenzizhao'
    }, function (err, doc) {
        res.json(doc)
    })
})

app.listen(9000, function () {
    console.log('Node server at 9000 port')
})