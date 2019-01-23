import React from 'react'
import Logo from '../components/logo/logo'
import { Button, WhiteSpace, InputItem, List, WingBlank } from 'antd-mobile'
class Login extends React.Component {
  register = () => {
    this.props.history.push('/register')
  }
  render () {
    return (
      <div>
        <Logo />
        <WingBlank>
          <List>
            <InputItem>用户</InputItem>
            <WhiteSpace />
            <InputItem>密码</InputItem>
          </List>
          <WhiteSpace />
          <Button type='primary'>登录</Button>
          <WhiteSpace />
          <Button type='primary' onClick={this.register}>
            注册
          </Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login
