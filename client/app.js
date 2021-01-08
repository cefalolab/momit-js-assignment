import React from 'react';
import { Switch, Route } from 'react-router-dom';

import RegisterPage from './pages/register.page';

function App() {
  return (
    <Switch>
      <Route exact path='/register'>
        <RegisterPage />
      </Route>
    </Switch>
  );
}

export default App;
