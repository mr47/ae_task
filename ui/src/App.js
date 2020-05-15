import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Transactions from './screens/transactions'

function App() {
  return (
    <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/">
            <Transactions />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
