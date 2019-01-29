import React from 'react'
import Logo from '../components/logo/logo'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button, WhiteSpace, InputItem, List, WingBlank } from 'antd-mobile'
import { login } from '../redux/user.redux'
@connect(
  state => state.user,
  { login }
)
class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      pwd: ''
    }
  }
  register = () => {
    this.props.history.push('/register')
  }
  handleChange (key, val) {
    this.setState({
      [key]: val
    })
  }
  handleLogin = () => {
    this.props.login(this.state)
  }
  render () {
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo />
        <WingBlank>
          <List>
            <InputItem onChange={v => this.handleChange('username', v)}>用户</InputItem>
            <WhiteSpace />
            <InputItem onChange={v => this.handleChange('pwd', v)}>密码</InputItem>
          </List>
          <WhiteSpace />
          <Button type='primary' onClick={this.handleLogin}>
            登录
          </Button>
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
