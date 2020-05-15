import { Map } from 'immutable' 
import types from '../../actions/types/transactions'

const INITIAL_LOADER_STATE = { loading: false, error: false }
export const transactions_loader = (state = INITIAL_LOADER_STATE, action) => {
  switch(action.type)
  {
    case types.GET_TRANSACTIONS_REQUEST:
    {
      return { loading: true, error: false }
    }
    case types.GET_TRANSACTIONS_SUCCESS:
    {
      return { loading: false, error: true }
    }
    default: return state
  }
} 

const INITIAL_TRANSACTIONS_STATE = Map();
export const transactions = (state = INITIAL_TRANSACTIONS_STATE, action) => {
  switch(action.type)
  {
    case types.GET_TRANSACTIONS_SUCCESS:
    {
      const allTransactions = Map(action.transactions.map(t => [t.id, t]))
      return state.merge(allTransactions)
    }
    default: return state
  }
}