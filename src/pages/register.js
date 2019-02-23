import React from 'react'
import Logo from '../components/logo/logo'
import { Button, WhiteSpace, InputItem, List, WingBlank, Radio } from 'antd-mobile'
import { connect } from 'react-redux'
import { register } from '../redux/user.redux'
import { Redirect } from 'react-router-dom'
import { imoocForm } from '../hoc/form'
const RadioItem = Radio.RadioItem

@connect(
  state => state.user,
  { register }
)
@imoocForm
class Register extends React.Component {
  componentDidMount () {
    this.props.handleChange('type', 'genius')
  }
  registerClick = () => {
    this.props.register(this.props.state)
  }

  render () {
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo />
        <WingBlank>
          {this.props.errMsg ? <p>{this.props.errMsg}</p> : ''}
          <List>
            <InputItem type='text' onChange={v => this.props.handleChange('username', v)}>
              用户名
            </InputItem>
            <InputItem type='password' onChange={v => this.props.handleChange('pwd', v)}>
              密码
            </InputItem>
            <InputItem type='password' onChange={v => this.props.handleChange('checkPwd', v)}>
              确认密码
            </InputItem>
            <RadioItem
              onChange={v => this.props.handleChange('type', 'genius')}
              checked={this.props.state.type === 'genius'}
            >
              Genius
            </RadioItem>
            <RadioItem
              onChange={v => this.props.handleChange('type', 'boss')}
              checked={this.props.state.type === 'boss'}
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
