import React from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import Footer from '../footer/footer'
import Boss from "../boss/boss";
import { Switch, Route } from 'react-router-dom'
// function Boss () {
//   return <h2>BOSS 首页</h2>
// }
function genius () {
  return <h2>牛人首页</h2>
}
function msg () {
  return <h2>msg首页</h2>
}
function me () {
  return <h2>me首页</h2>
}
@connect(state => state)
class Dashboard extends React.Component {
  render () {
    const { pathname } = this.props.location
    const user = this.props.user
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: genius,
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
        component: msg
      },
      {
        path: '/me',
        text: '我',
        icon: 'boss',
        title: '个人中心',
        component: me
      }
    ]
    return (
      <div>
        <NavBar className='fixed-header' mode='hard'>
          {navList.find(v => v.path === pathname).title}
        </NavBar>
        <div style={{ 'marginTop': '45px' }}>
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
