import axios from 'axios'
import socketIo from 'socket.io-client'
const socket = socketIo('ws://localhost:9000')

const MSG_LIST = 'MSG_LIST'

const MGS_RECV = 'MGS_RECV'
const MSG_READ = 'MSG_READ'

const initState = {
  chatMsg: [],
  users: [],
  unread: 0
}

export function chat(state = initState, action) {
  const {
    data,
    type
  } = action
  switch (type) {
    case MSG_LIST:
      return {
        ...state,
        chatMsg: data.msgList,
        users: data.users,
        unread: data.msgList.filter(v => !v.read && v.to === data.userId).length
      }
    case MSG_READ:
      return {
        ...state,
        chatMsg: [...state.chatMsg, data]
      }
    case MGS_RECV:
      const n = data.data.from === data.userId ? 0 : 1
      return {
        ...state,
        chatMsg: [...state.chatMsg, data.data],
        unread: state.unread += n
      }
    default:
      return state
  }
}

export function getMsgList() {
  return (dispatch, getState) => {
    axios.get('/chat/msg/list').then(res => {
      const {
        msgList,
        code,
        users
      } = res.data
      if (code === 0) {
        // getstate 获取redux所有数据
        const userId = getState().user._id
        dispatch({
          type: MSG_LIST,
          data: {
            msgList,
            users,
            userId
          }
        })
      }
    })
  }
}

export function sendMsg({
  from,
  to,
  msg
}) {
  return dispatch => {
    socket.emit('sendmsg', {
      from,
      to,
      msg
    })
  }
}

export function receiveMsg() {
  return (dispatch, getState) => {
    socket.on('recvmsg', function (data) {
      // 只能在事件内部调用，在外部进不来。
      const userId = getState().user._id
      dispatch({
        type: MGS_RECV,
        data: {
          data,
          userId
        },
      })
    })
  }
}