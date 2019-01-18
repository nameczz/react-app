import React, { Component } from 'react'
import { Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logout } from '../auth.redux'

@connect(
  state => state.authCheck,
  { logout }
)
class Data extends Component {
  render () {
    const redirectComponent = <Redirect to='/' />
    return this.props.isAuth ? (
      <div>
        <Button onClick={this.props.logout}>Logout</Button>
        <h2> Data Page </h2>
      </div>
    ) : (
      redirectComponent
    )
  }
}

export default Data
