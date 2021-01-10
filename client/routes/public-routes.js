import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// components
import RegisterPage from '../pages/register.page';
import LoginPage from '../pages/login.page';
import HomePage from '../pages/home.page';

function PublicRoutes() {
  return (
    <Switch>
      <Route exact path='/'>
        <HomePage />
      </Route>
      <Route exact path='/login'>
        <LoginPage />
      </Route>
      <Route exact path='/register'>
        <RegisterPage />
      </Route>
      <Route>
        <Redirect exact to='/' />
      </Route>
    </Switch>
  );
}

export default PublicRoutes;
