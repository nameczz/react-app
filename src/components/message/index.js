import React from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile';
import ListItem, { Brief } from 'antd-mobile/lib/list/ListItem';

@connect(
  state=>state
)
class Message extends React.Component{
  getLast(arr){
    return arr[arr.length-1]
  }
  render(){
    console.log(this.props)
    const msgGroup = {}
    const userId = this.props.user._id
    this.props.chat.chatMsg.forEach(v=>{
      if(!msgGroup[v.chatid]){
        msgGroup[v.chatid] = [v]
      } else {
        msgGroup[v.chatid].push(v)
      }
    })
    console.log(msgGroup)
    const chatList = Object.values(msgGroup).sort((a,b)=>{
      return this.getLast(b).create_time - this.getLast(a).create_time
    })
    console.log(chatList)
    return (
      <div>
        <List>
          {chatList.map(v=>{
            const lastItem = this.getLast(v)
            const chatUserId = lastItem.from === userId ? lastItem.to : lastItem.from
            const chatUser = this.props.chat.users[chatUserId]
            const unreadCount = v.filter(item=>!item.read && item.to === userId).length
            return <ListItem
              key={lastItem._id}
              extra={<Badge text={unreadCount}></Badge>}
              arrow="horizontal"
              onClick={()=>{
                this.props.history.push(`/chat/${chatUserId}`)
              }}
              thumb={require(`../img/${chatUser.avatar}.png`)}>
              {lastItem.content}
              <Brief>{chatUser.name}</Brief>
            </ListItem>
            })
          }
        </List>
      </div>
    )
  }
}

export default Message