import axios from 'axios'

const USER_LIST = 'USER_LIST'
const initState = {
  userList: []
}
export function chatuser(state = initState, action) {
  switch (action.type) {
    case USER_LIST:
      console.log(action.data)
      return {
        ...state,
        userList: action.data
      }
    default:
      return state
  }
}

function userList(data) {
  return {
    type: USER_LIST,
    data
  }
}

export function getUserList() {
  return dispatch => {
    axios.get('/user/list?type=genius').then(res => {
      if (res.data.code === 0) {
        dispatch(userList(res.data.data))
      }
    })
  }
}