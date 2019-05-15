const express = require('express')
const Router = express.Router()
const model = require('./model')
const Chat = model.getModel('chat')
const User = model.getModel('user')
Router.get('/msg/list', function (req, res) {
  // Chat.remove({}, (err, doc) => {console.log(doc)})
  const {
    userId
  } = req.cookies
  User.find({}, function (err, userdoc) {
    let users = {}
    userdoc.forEach(v => {
      users[v._id] = {
        name: v.username,
        avatar: v.avatar
      }
    })
    Chat.find({
      '$or': [{
        from: userId
      }, {
        to: userId
      }]
    }, function (err, doc) {
      if (err) {
        res.json({
          code: 1
        })
      }
      return res.json({
        code: 0,
        msgList: doc,
        users
      })
    })
  })


})

module.exports = Router