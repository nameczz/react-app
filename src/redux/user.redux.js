import axios from 'axios'
import {getRedirectPath} from '../utils'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const REGISTER_FAIL = 'REGISTER_FAIL'
const SAVE_USER_STATE = 'SAVE_USER_STATE'
const CLEAR_USER_STATE = 'CLEAR_USER_STATE'
const initState = {
  redirectTo: '',
  user: '',
  type: '',
  errMsg: ''
}

// reducer 需要在外部createStore
export function user(state = initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        errMsg: '',
        redirectTo: getRedirectPath(action.data),
        ...action.data
      }
    case SAVE_USER_STATE:
      return {
        ...state,
        ...action.data,
        errMsg: ''
      }
    case REGISTER_FAIL:
      return {
        ...state,
        redirectTo: '',
        errMsg: action.msg
      }
    case CLEAR_USER_STATE:
      return {
        ...initState,
      }
    default:
      return state
  }
}

// 内部函数
function authSuccess(data) {
  return {
    type: AUTH_SUCCESS,
    data
  }
}

function fail(msg) {
  return {
    msg,
    type: REGISTER_FAIL
  }
}
export function saveUserState(data) {
  return {
    type: SAVE_USER_STATE,
    data
  }
}
export function login({
  username,
  pwd
}) {
  if (!username || !pwd) return fail('用户名密码必须输入')
  return dispatch => {
    axios.post('/user/login', {
        username,
        pwd
      })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data))
        } else {
          dispatch(fail('帐号或密码错误'))
        }
      })
  }
}
export function register({
  username,
  pwd,
  checkPwd,
  type
}) {
  if (!username || !pwd || !checkPwd) {
    return fail('用户名密码必须输入')
  }
  if (pwd !== checkPwd) {
    return fail('2次密码输入不一致')
  }
  return dispatch => {
    axios.post('/user/register', {
        username,
        pwd,
        checkPwd,
        type
      })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess({
            username,
            pwd,
            type
          }))
        } else {
          dispatch(fail('注册失败'))
        }
      })
  }
}

export function update(data) {
  return dispatch => {
    axios.post('/user/update', data)
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data))
        } else {
          dispatch(fail('帐号或密码错误'))
        }
      })
  }
}

export function clearUserState() {
  return dispatch => {
    dispatch({
      type: CLEAR_USER_STATE
    })
  }
}