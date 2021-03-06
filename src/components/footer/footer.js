import React from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

@withRouter
class NavLinkBar extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  }
  render () {
    const navList = this.props.data.filter(v => !v.hide)
    const { pathname } = this.props.location

    return (
      <div>
        <TabBar>
          {navList.map(v => (
            <TabBar.Item
              key={v.path}
              title={v.text}
              icon={{ uri: require('./list.png') }}
              selectedIcon={{ uri: require('./list.png') }}
              selected={pathname === v.path}
              badge={v.unread || 0}
              onPress={() => {
                this.props.history.push(v.path)
              }}
            />
          ))}
        </TabBar>
      </div>
    )
  }
}

export default NavLinkBar
