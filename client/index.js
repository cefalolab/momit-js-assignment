import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider as ChakraUI } from '@chakra-ui/react';
import { Provider as ReduxProvider } from 'react-redux';

import store from './redux/store';

import App from './app';

ReactDOM.render(
  <ReduxProvider store={store}>
    <Router>
      <ChakraUI>
        <App />
      </ChakraUI>
    </Router>
  </ReduxProvider>,
  document.getElementById('root')
);

// Enable hot module if available
if (module.hot) {
  module.hot.accept();
}
