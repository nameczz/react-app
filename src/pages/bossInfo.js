import React from 'react'
import { NavBar, InputItem, List, TextareaItem, Button } from 'antd-mobile'
import AvatarSelector from '../components/avatarSelector'
import { connect } from 'react-redux'
import { update } from '../redux/user.redux'
@connect(
  state => state.user,
  {
    update
  }
)
class BossInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      position: '',
      desc: '',
      money: '',
      company: '',
      avatar: ''
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
        <NavBar mode='dark'>Boss 完善信息页面</NavBar>
        <AvatarSelector
          selectAvatar={imgName => {
            this.setState({ avatar: imgName })
          }}
        />
        <List>
          <InputItem onChange={v => this.onChange('position', v)}> 招聘职位</InputItem>
          <InputItem onChange={v => this.onChange('company', v)}> 公司</InputItem>
          <InputItem onChange={v => this.onChange('money', v)}> 薪资</InputItem>
          <TextareaItem onChange={v => this.onChange('desc', v)} rows={3} autoHeight title='描述' />
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

export default BossInfo
