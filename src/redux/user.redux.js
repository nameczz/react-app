import axios from 'axios'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const REGISTER_FAIL = 'REGISTER_FAIL'

const initState = {
  user: '',
  pwd: '',
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
        ...action.data
      }
    case REGISTER_FAIL:
      return { ...state,
        isAuth: false,
        errMsg: action.msg
      }
    default:
      return state
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