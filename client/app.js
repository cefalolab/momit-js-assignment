import React from 'react';
import { Switch, Route } from 'react-router-dom';

import RegisterPage from './pages/register.page';
import LoginPage from './pages/login.page';

function App() {
  return (
    <Switch>
      <Route exact path='/login'>
        <LoginPage />
      </Route>
      <Route exact path='/register'>
        <RegisterPage />
      </Route>
    </Switch>
  );
}

export default App;
