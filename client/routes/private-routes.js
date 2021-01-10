import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// components
import HomePage from '../pages/home.page';
import CheckoutPage from '../pages/checkout.page';

function PrivateRoutes() {
  return (
    <Switch>
      <Switch>
        <Route exact path='/'>
          <HomePage />
        </Route>
        <Route exact path='/checkout'>
          <CheckoutPage />
        </Route>
        <Route>
          <Redirect exact to='/' />
        </Route>
      </Switch>
    </Switch>
  );
}

export default PrivateRoutes;
