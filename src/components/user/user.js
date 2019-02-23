import React from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Modal, Button } from 'antd-mobile'
import Cookies from 'browser-cookies'
import { Redirect } from 'react-router-dom'
import { clearUserState } from '../../redux/user.redux'
@connect(
  state => state.user,
  { clearUserState }
)
class User extends React.Component {
  constructor (props) {
    super(props)
    this.logout = this.logout.bind(this)
  }
  logout () {
    const alert = Modal.alert
    alert('Delete', 'Are you sure???', [
      { text: 'Cancel', onPress: () => console.log('cancel') },
      {
        text: 'Ok',
        onPress: () => {
          Cookies.erase('userId')
          this.props.clearUserState()
        }
      }
    ])
  }
  render () {
    const props = this.props
    const Item = List.Item
    const Brief = Item.Brief
    return props.username ? (
      <div>
        <Result
          img={
            <img
              src={require(`../img/${props.avatar}.png`)}
              style={{ width: '50px' }}
              alt='avatar'
            />
          }
          title={props.username}
          message={props.type === 'boss' ? props.company : null}
        />
        <List renderHeader={() => '简介'}>
          <Item multipleLine>
            {props.position || props.company}
            {props.desc.split('\n').map(v => (
              <Brief key={v}>{v}</Brief>
            ))}
            {props.money ? <Brief key={props.money}>薪资：{props.money}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace />
        <List>
          <Button onClick={this.logout}>退出登陆</Button>
        </List>
      </div>
    ) : <Redirect to='/login'></Redirect>
  }
}

export default User
