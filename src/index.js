import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import AuthRoute from './components/authRoute/index'
import thunk from 'redux-thunk'
import Login from './pages/login'
import Register from './pages/register'
import { BrowserRouter, Route } from 'react-router-dom'
import Reducers from './reducers'
import { Provider } from 'react-redux'
import BossInfo from './pages/bossInfo';
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
        <Route path="/bossinfo" component={BossInfo}></Route>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
