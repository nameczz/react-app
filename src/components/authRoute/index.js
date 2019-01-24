import React from 'react'
import axios from 'axios'
import {
  withRouter
} from 'react-router-dom'
import {
  connect
} from 'react-redux'
import {
  saveUserState
} from '../../redux/user.redux'
@withRouter // 没有这个装饰器的话无法获取到props
@connect(
  null, {
    saveUserState
  }
)
class AuthRoute extends React.Component {
  componentDidMount() {
    const publicPath = ['/login', '/register']
    const currentPath = this.props.location.pathname
    if (publicPath.includes(currentPath)) {
      return null
    }
    axios.get('/user/info').then(res => {
      if (res.status === 200 && res.data.code === 0) {
        this.props.saveUserState(res.data.data)
      } else {
        this.props.history.push('/login')
      }
    })
  }
  render() {
    return null
  }
}

export default AuthRoute