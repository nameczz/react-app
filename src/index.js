import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import AuthRoute from './components/authRoute/index'
import thunk from 'redux-thunk'
import './index.css'
import Login from './pages/login'
import Register from './pages/register'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Reducers from './reducers'
import { Provider } from 'react-redux'
import BossInfo from './pages/bossInfo'
import GeniusInfo from './pages/geniusInfo'
import Dashboard from './components/dashboard/dashboard'
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
        <AuthRoute />
        <Switch>
          <Route path='/bossinfo' component={BossInfo} />
          <Route path='/geniusinfo' component={GeniusInfo} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route component={Dashboard} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
