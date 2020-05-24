import users from './users.reducers'
import select from './selected.reducers'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  users,
  select
})

export default rootReducer;
