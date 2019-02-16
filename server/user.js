const express = require('express')
const Router = express.Router()
const util = require('utility')
const model = require('./model')
const User = model.getModel('user')
const _filter = {
  pwd: 0,
  __v: 0
}
Router.post('/register', (req, res) => {
  const {
    username,
    pwd,
    type
  } = req.body
  User.findOne({
      username
    },
    (err, doc) => {
      if (doc) {
        return res.json({
          code: 1,
          msg: '用户名已存在'
        })
      }
      const userModel = new User({
        username,
        pwd: saltMd5(pwd),
        type
      })
      userModel.save((err, doc) => {
        if (err) return res.json({
          code: 1,
          msg: '后端错误'
        })
        res.cookie('userId', doc._id)
        const {
          username,
          _id,
          type
        } = doc
        return res.json({
          code: 0,
          data: {
            username,
            _id,
            type
          }
        })
      })

    }
  )
})
Router.post('/login', (req, res) => {
  const {
    username,
    pwd
  } = req.body
  User.find({
      username,
      pwd: saltMd5(pwd)
    }, _filter,
    (err, doc) => {
      if (doc.length) {
        res.cookie('userId', doc[0]._id)
        return res.json({
          code: 0,
          data: doc[0]
        })
      }
      return res.json({
        code: 1,
        msg: '用户名或密码错误'
      })
    }
  )
})
Router.post('/update', (req, res) => {
  const {
    userId
  } = req.cookies
  if (!userId) {
    return res.json({
      code: 1
    })
  }
  User.findByIdAndUpdate(userId, req.body, (err, doc) => {
    if (err) {
      res.json({
        code: 1
      })
    }
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type
    }, req.body)
    return res.json({
      code: 0,
      data
    })
  })
})
Router.get('/list', (req, res) => {
  // User.remove({}, (err, doc) => {})
  const {
    type
  } = req.query

  User.find({
    type
  }, (err, doc) => {
    res.json({
      code: 0,
      data: doc
    })
  })
})
Router.get('/info', (req, res) => {
  const {
    userId
  } = req.cookies
  if (!userId) {
    return res.json({
      code: 1
    })
  }
  User.findById(userId, _filter, (err, doc) => {
    if (err) return res.json({
      code: 1
    })
    return res.json({
      code: 0,
      data: doc
    })
  })
})

function saltMd5(pwd) {
  const salt = 'chenzizhao.love.sangdongmei@#$'
  return util.md5(util.md5(pwd + salt))
}
module.exports = Router