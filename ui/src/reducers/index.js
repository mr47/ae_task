import { combineReducers } from 'redux'
import * as transactionsReducers from './transactions'

export default combineReducers({
  ...transactionsReducers
})
