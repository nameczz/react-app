import React from 'react'
import { List, InputItem, NavBar, Icon,Grid } from 'antd-mobile'
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
    this.state = { text: '', showEmoji: false,  }
  }
  componentDidMount () {
    if (!this.props.chat.chatMsg.length) {
      this.props.getMsgList()
      this.props.receiveMsg()
    }

    this.fixGrid()

  }
  fixGrid(){
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0);
  }
  send () {
    const from = this.props.user._id
    const to = this.props.match.params.userId
    const msg = this.state.text
    this.props.sendMsg({ from, to, msg })
    this.setState({ text: '' })
  }
  render () {
    const emoji = '😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 🥰 😗 😙 😚 ☺️ 🙂 🤗 🤩 🤔 🤨 😐 😑 😶 🙄 😏 😣 😥 😮 🤐 😯 😪 😫 😴 😌 😛 😜 😝 🤤 😒 😓 😔 😕 🙃 🤑 😲 ☹️ 🙁 😖 😞 😟 😤 😢 😭 😦 😧 😨 😩 🤯 😬 😰 😱 🥵 🥶 😳 🤪 😵 😡 😠 🤬 😷 🤒 🤕 🤢 🤮 🤧 😇 🤠 🤡 🥳 🥴 🥺 🤥 🤫 🤭 🧐 🤓 😈 👿 👹 👺 💀 👻 👽 🤖 💩 😺 😸 😹 😻 😼 😽 🙀 😿 😾'
                  .split(' ')
                  .filter(v=>v)
                  .map(v=>{return {text:v}})
                  
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
              extra={
                <div>
                  <span
                    style={{marginRight:15}}
                    role="img"
                    aria-label="smile"
                    onClick={v=>{
                      this.setState({
                        showEmoji: !this.state.showEmoji
                      })
                      this.fixGrid()
                    }}
                    > 😂</span>
                  <span onClick={v => {
                    this.send()
                    this.setState({showEmoji:false})
                  }}>发送</span>
                </div>
              }
            />
          </List>
          {
            this.state.showEmoji ?
            <Grid data={emoji}
              columnNum={9}
              carouselMaxRow={4}
              isCarousel={true}
              onClick={v=>{
                console.log(v)
                this.setState({
                  text: this.state.text + v.text
                })
              }}
            /> : null
          }
          
        </div>
      </div>
    )
  }
}

export default ChatUser
