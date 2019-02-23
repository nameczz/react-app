import React from 'react'
import { NavBar, InputItem, List, TextareaItem, Button } from 'antd-mobile'
import AvatarSelector from '../components/avatarSelector'
import { connect } from 'react-redux'
import { update } from '../redux/user.redux'
import {Redirect} from 'react-router-dom'
@connect(
  state => state.user,
  {
    update
  }
)
class GeniusInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      position: '',
      desc: ''
    }
  }
  onChange (key, val) {
    this.setState({
      [key]: val
    })
  }
  render () {
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <NavBar mode='dark'>Boss 完善信息页面</NavBar>
        <AvatarSelector
          selectAvatar={imgName => {
            this.setState({ avatar: imgName })
          }}
        />
        <List>
          <InputItem onChange={v => this.onChange('position', v)}> 求职岗位</InputItem>
          <TextareaItem onChange={v => this.onChange('desc', v)} rows={3} autoHeight title='个人见解' />
          <Button
            onClick={() => {
              this.props.update(this.state)
            }}
            type='primary'
          >
            保存
          </Button>
        </List>
      </div>
    )
  }
}

export default GeniusInfo
