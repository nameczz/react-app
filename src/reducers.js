import {
    combineReducers
} from 'redux'
import {
    user
} from './redux/user.redux'
import {
    chatuser
} from './redux/chatuser.redux'
import {
    chat
} from './redux/message.redux'
export default combineReducers({
    chatuser,
    user,
    chat
})