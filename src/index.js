import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import App from './App'
import Data from './page/data'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Reducers from './reducers'
import { Provider } from 'react-redux'
const store = createStore(
  Reducers,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <ul>
          <li>
            <Link to='/'>主页面</Link>
          </li>
          <li>
            <Link to='/data'>Data page</Link>
          </li>
        </ul>
        <Route path='/' exact component={App} />
        <Route path='/data' component={Data} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
