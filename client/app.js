import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { getLocalItem } from './helper/local-storage-handler';
import { loginUser } from './redux/modules/auth.store';

import Header from './container/header.container';
import RegisterPage from './pages/register.page';
import LoginPage from './pages/login.page';
import HomePage from './pages/home.page';
import CheckoutPage from './pages/checkout.page';

function App({ loggedIn, dispatch }) {
  // states
  const [mounted, setMounted] = useState(false);

  // effects
  useEffect(() => {
    const token = getLocalItem('token');
    const user = getLocalItem('user');
    if (token && user) {
      dispatch(loginUser(token, user));
    }
    setMounted(true);
  }, []);

  // render start from here
  if (!mounted) {
    return null;
  }

  // public routes only
  if (!loggedIn) {
    return (
      <>
        <Header />
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
      </>
    );
  }

  // private routes with some public routes
  return (
    <>
      <Header />
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
    </>
  );
}

App.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({ loggedIn: store.auth.loggedIn });

export default connect(mapStateToProps)(App);
