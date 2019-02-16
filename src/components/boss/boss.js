import React from 'react'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chatuser.redux'

@connect(
  state => state.chatuser,
  { getUserList }
)
class Boss extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      geniusList: []
    }
  }
  componentDidMount () {
    this.props.getUserList()
  }
  render () {
    return (
      <div>
        <WingBlank size='lg'>
          <WhiteSpace size='lg' />
          {this.props.userList.map(v => (
            <Card key={v._id}>
              <Card.Header
                title={v.username}
                thumb={require(`../img/${v.avatar || 'boy'}.png`)}
                extra={<span>{v.position}</span>}
              />
              <Card.Body>
                <div>{v.desc ? v.desc.split('\n').map(v => <div key={v}>{v}</div>) : ''}</div>
              </Card.Body>
            </Card>
          ))}
          <WhiteSpace size='lg' />
        </WingBlank>
      </div>
    )
  }
}

export default Boss
