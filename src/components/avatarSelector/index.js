import React from 'react'
import { Grid, List } from 'antd-mobile'
class AvatarSelector extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    const avatarList = [
      'boy',
      'bull',
      'chick',
      'crab',
      'girl',
      'hedgehog',
      'hippopotamus',
      'koala',
      'lemur',
      'man',
      'pig',
      'tiger',
      'whale',
      'woman',
      'zebra'
    ].map(v => ({
      icon: require(`./img/${v}.png`),
      text: v
    }))
    const choosedAvatar = this.state.icon ? (
      <div>
        <span>已选择头像</span>
        <img src={this.state.icon} alt='icon' />
      </div>
    ) : <p>请选择头像</p>
    return (
      <div>
        <List renderHeader={() => choosedAvatar}>
          <Grid
            data={avatarList}
            columnNum={5}
            onClick={data => {
              this.setState(data)
              this.props.selectAvatar(data.text)
            }}
          >
            头像选择
          </Grid>
        </List>
      </div>
    )
  }
}

export default AvatarSelector
