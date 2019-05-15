const mongoose = require('mongoose')

const DB_URL = 'mongodb://localhost:27017/imooc'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function () {
  console.log('--------- mongodb connected ----------')
})

const models = {
  user: {
    username: {
      type: String,
      require: true
    },
    pwd: {
      type: String,
      require: true
    },
    type: {
      type: String
    },
    avatar: {
      type: String
    },
    company: {
      type: String
    },
    money: {
      type: String
    },
    desc: {
      type: String
    },
    position: {
      type: String
    }
  },
  chat: {
    chatid: {
      type: String,
      require: true
    },
    from: {
      type: String,
      require: true
    },
    to: {
      type: String,
      require: true
    },
    read: {
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      require: true
    },
    create_time: {
      type: Number,
      default: new Date().getTime()
    }
  }
}

for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}
module.exports = {
  getModel: name => {
    return mongoose.model(name)
  }
}