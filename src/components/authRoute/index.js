import React from 'react'
import axios from 'axios'
import {withRouter} from'react-router-dom'

@withRouter // 没有这个装饰器的话无法获取到props
class AuthRoute extends React.Component {
  componentDidMount () {
    const publicPath = ['/login', '/register']
    const currentPath = this.props.location.pathname
    if (publicPath.includes(currentPath)){
        return null
    }
    axios.get('/user/info').then(res => {
      console.log(res.data)
    })
  }
  render () {
    return null
  }
}

export default AuthRoute
