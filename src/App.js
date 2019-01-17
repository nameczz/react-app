import React, { Component } from 'react'
import { Button, List } from 'antd-mobile'
import { connect } from 'react-redux'
import { add, remove, addAsync } from './index.redux'

@connect(
  state => {
    return { num: state }
  },
  { add, remove, addAsync }
)
class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      List: ['Curry', 'Lebron', 'Durrant']
    }
  }

  addList () {
    this.setState({
      List: [...this.state.List, 'Kobe']
    })
  }

  render () {
    return (
      <div>
        <p>First React App</p>
        <p>Now is {this.props.num} </p>
        <Button onClick={this.props.add}>Add Number</Button>
        <Button type='primary' onClick={this.props.addAsync}>AddAsync Number</Button>
        <Button type='warning' onClick={this.props.remove}>
          Remove Number
        </Button>
        <Button type='primary' onClick={() => this.addList()}>
          Add List
        </Button>
        <List renderHeader={() => 'NBA Player'}>
          {this.state.List.map(val => {
            return <List.Item key={val}> {val} </List.Item>
          })}
        </List>
      </div>
    )
  }
}

export default App
