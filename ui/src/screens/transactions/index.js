import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography } from '@material-ui/core';
import { getTransactions } from '../../actions/transactions'
import { getTransactions as getTransactionsSelector } from '../../selectors/transactions'
import { TransactionCard } from '../../components/transaction-card'

function Transactions({ transactions, loader, getTransactions }) {
  useEffect(() => { getTransactions() }, [])

  const renderTransactions = () => {
    if (loader.loading) return <LinearProgress />
    if (transactions.length > 0) {
      return transactions.map((t) => <TransactionCard key={t.id} {...t} />)
    }
    return (
      <Typography variant="h5" component="h5">
        No Transactions Yet
      </Typography>
    )
  }

  return (
    <div>
      <Typography variant="h1" component="h2" gutterBottom>
        Transactions History
      </Typography>
      <Button onClick={getTransactions} variant="contained" color="primary" style={{ marginBottom: 10 }}>
        Update Transactions
      </Button>
      {renderTransactions()}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    transactions: getTransactionsSelector(state),
    loader: state.transactions_loader
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTransactions: () => dispatch(getTransactions())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)