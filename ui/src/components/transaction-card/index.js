import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

const useStyles = makeStyles({
  credit: {
    minWidth: 275,
    backgroundColor: green[500],
  },
  debit: {
    minWidth: 275,
    backgroundColor: red[500]
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export function TransactionCard({ id, type, amount, effectiveDate }) {
  const classes = useStyles();
  return (
    <Card className={type === 'credit' ? classes.credit : classes.debit} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {type.toUpperCase()}
        </Typography>
        <Typography variant="h5" component="h2">
          {amount}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {effectiveDate}
        </Typography>
        <Typography variant="body2" component="p">
          {`Id: ${id}`}
        </Typography>
      </CardContent>
    </Card>
  )
}
