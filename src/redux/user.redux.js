import axios from 'axios'
import utils from '../utils'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const REGISTER_FAIL = 'REGISTER_FAIL'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const SAVE_USER_STATE = 'SAVE_USER_STATE'
const initState = {
  redirectTo: '',
  user: '',
  type: '',
  isAuth: false,
  errMsg: ''
}

// reducer 需要在外部createStore
export function user(state = initState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return { ...state,
        errMsg: '',
        isAuth: true,
        redirectTo: utils.getRedirectPath(action.data),
        ...action.data
      }
    case LOGIN_SUCCESS:
      return { ...state,
        ...action.data,
        isAuth: true,
        errMsg: ''
      }
    case SAVE_USER_STATE:
      return { ...state,
        ...action.data,
        isAuth: true,
        errMsg: ''
      }
    case REGISTER_FAIL:
      return { ...state,
        isAuth: false,
        redirectTo: '',
        errMsg: action.msg
      }
    default:
      return state
  }
}

function loginSuccess(data) {
  return {
    type: LOGIN_SUCCESS,
    data
  }
}
// 内部函数
function registerSuccess(data) {
  return {
    type: REGISTER_SUCCESS,
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
          dispatch(loginSuccess(res.data.data))
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
          dispatch(registerSuccess({
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