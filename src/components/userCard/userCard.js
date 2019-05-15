import React from 'react'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

@withRouter
class UserCard extends React.Component {
  static propTypes = {
    userList: PropTypes.array.isRequired
  }

  handleClick (v) {
    this.props.history.push(`/chat/${v._id}`)
  }

  render () {
    return (
      <div>
        <WingBlank size='lg'>
          <WhiteSpace size='lg' />
          {this.props.userList.map(v => (
            <Card key={v._id} onClick={() => this.handleClick(v)}>
              <Card.Header
                title={v.username}
                thumb={require(`../img/${v.avatar || 'boy'}.png`)}
                extra={<span>{v.position}</span>}
              />
              <Card.Body>
                <div>{v.desc ? v.desc.split('\n').map(v => <div key={v}>{v}</div>) : ''}</div>
                {v.money ? <p>薪水：{v.money}/month</p> : null}
              </Card.Body>
            </Card>
          ))}
          <WhiteSpace size='lg' />
        </WingBlank>
      </div>
    )
  }
}

export default UserCard
