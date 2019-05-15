import React from 'react'
import { List, InputItem, NavBar, Icon } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, receiveMsg } from '../../redux/message.redux'
import { withRouter } from 'react-router-dom'
import { getChatId } from '../../utils'

@withRouter
@connect(
  state => state,
  { getMsgList, sendMsg, receiveMsg }
)
class ChatUser extends React.Component {
  constructor (props) {
    super(props)
    this.state = { text: '', msg: [] }
  }
  componentDidMount () {
    if (!this.props.chat.chatMsg.length) {
      this.props.getMsgList()
      this.props.receiveMsg()
    }
  }
  send () {
    const from = this.props.user._id
    const to = this.props.match.params.userId
    const msg = this.state.text
    this.props.sendMsg({ from, to, msg })
    this.setState({ text: '' })
  }
  render () {
    const chatUserId = this.props.match.params.userId
    const users = this.props.chat.users
    const Item = List.Item
    const chatId = getChatId(chatUserId, this.props.user._id)
    const chatMsgs = this.props.chat.chatMsg.filter(v => v.chatid === chatId)
    if (!users[chatUserId]) return null
    return (
      <div id='chat-page'>
        <NavBar
          mode='dark'
          icon={<Icon type='left' />}
          onLeftClick={() => this.props.history.goBack()}
        >
          {users[chatUserId].name}
        </NavBar>
        <List>
          {chatMsgs.map(v => {
            const avatar = require(`../img/${users[v.from].avatar}.png`)
            return v.from === chatUserId ? (
              <Item key={v._id} thumb={avatar}>
                {v.content}
              </Item>
            ) : (
              <Item key={v._id} extra={<img src={avatar} alt='avatar' />} className='chat-me'>
                {v.content}
              </Item>
            )
          })}
        </List>

        <div className='stick-footer'>
          <List>
            <InputItem
              placeholder='请输入'
              value={this.state.text}
              onChange={v => this.setState({ text: v })}
              extra={<span onClick={v => this.send()}>发送</span>}
            />
          </List>
        </div>
      </div>
    )
  }
}

export default ChatUser
