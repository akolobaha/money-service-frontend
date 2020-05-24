import users from './users.reducers'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  users
})

export default rootReducer;
