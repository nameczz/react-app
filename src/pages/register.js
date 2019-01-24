import React from 'react'
import Logo from '../components/logo/logo'
import { Button, WhiteSpace, InputItem, List, WingBlank, Radio } from 'antd-mobile'
import { connect } from 'react-redux'
import { register } from '../redux/user.redux'
import { Redirect } from 'react-router-dom'
const RadioItem = Radio.RadioItem

@connect(
  state => state.user,
  { register }
)
class Register extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      pwd: '',
      checkPwd: '',
      type: 'genius'
    }
  }
  registerClick = () => {
    this.props.register(this.state)
  }
  handleChange (key, val) {
    this.setState({
      [key]: val
    })
  }
  render () {
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo />
        <WingBlank>
          {this.props.errMsg ? <p>{this.props.errMsg}</p> : ''}
          <List>
            <InputItem type='text' onChange={v => this.handleChange('username', v)}>
              用户名
            </InputItem>
            <InputItem type='password' onChange={v => this.handleChange('pwd', v)}>
              密码
            </InputItem>
            <InputItem type='password' onChange={v => this.handleChange('checkPwd', v)}>
              确认密码
            </InputItem>
            <RadioItem
              onChange={v => this.handleChange('type', 'genius')}
              checked={this.state.type === 'genius'}
            >
              Genius
            </RadioItem>
            <RadioItem
              onChange={v => this.handleChange('type', 'boss')}
              checked={this.state.type === 'boss'}
            >
              Boss
            </RadioItem>
            <WhiteSpace />
            <Button type='primary' onClick={this.registerClick}>
              注册
            </Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default Register
