import React from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import Footer from '../footer/footer'
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import Message from '../message/index'
import User from '../user/user'
import { Switch, Route } from 'react-router-dom'
import { getMsgList, receiveMsg } from '../../redux/message.redux'

@connect(
  state => state,
  { getMsgList, receiveMsg }
)
class Dashboard extends React.Component {
  componentDidMount () {
    if (!this.props.chat.chatMsg.length) {
      this.props.getMsgList()
      this.props.receiveMsg()
    }
  }
  render () {
    const { pathname } = this.props.location
    const user = this.props.user
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Genius,
        hide: user.type === 'genius'
      },
      {
        path: '/genius',
        text: 'Boss',
        icon: 'boss',
        title: 'Boss列表',
        component: Boss,
        hide: user.type === 'boss'
      },
      {
        path: '/msg',
        text: 'Message',
        icon: 'boss',
        title: '消息列表',
        component: Message,
        unread: this.props.chat.unread
      },
      {
        path: '/me',
        text: '我',
        icon: 'boss',
        title: '个人中心',
        component: User
      }
    ]
    return (
      <div>
        <NavBar className='fixed-header' mode='hard'>
          {navList.find(v => v.path === pathname).title}
        </NavBar>
        <div style={{ marginTop: '45px' }}>
          <Switch>
            {navList.map(v => (
              <Route component={v.component} path={v.path} key={v.path} />
            ))}
          </Switch>
        </div>
        <Footer data={navList} />
      </div>
    )
  }
}
export default Dashboard
