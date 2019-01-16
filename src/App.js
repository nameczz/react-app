import React, { Component } from 'react'
import { Button, List } from 'antd-mobile'
class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      List: ['Curry', 'Lebron', 'Durrant']
    }
  }

  addList () {
    // this 绑定的绑定
    this.setState({
      List: [...this.state.List, 'Kobe']
    })
  }

  render () {
    return (
      <div>
        <p>First React App</p>
        <Button type='primary' onClick={()=>this.addList()}>
          Add List
        </Button>
        <List renderHeader={() => 'NBA Player'}>
          {this.state.List.map(val => {
            return <List.Item key={val}>{val}</List.Item>
          })}
        </List>
      </div>
    )
  }
}

export default App
