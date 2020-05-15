import { createSelector } from 'reselect'
import { getTransactionsFromState } from './getters'

const transactionsAsArray = transactions => transactions.valueSeq().toArray()

export const getTransactions = createSelector(
  [getTransactionsFromState],
  transactions => transactionsAsArray(transactions)
)
