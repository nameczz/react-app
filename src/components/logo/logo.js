import React from 'react'
import './index.css'
import logoImg from './logo.jpeg'
class Logo extends React.Component {
  render () {
    return (
      <div>
        <img src={logoImg} className='logo' alt='Logo' />
      </div>
    )
  }
}

export default Logo
