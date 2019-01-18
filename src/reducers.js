import { combineReducers } from 'redux'
import { counter } from './index.redux'
import { authCheck } from './auth.redux'

export default combineReducers({ counter, authCheck })
