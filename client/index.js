import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider as Chakra } from '@chakra-ui/react';

import App from './app';

ReactDOM.render(
  <Router>
    <Chakra>
      <App />
    </Chakra>
  </Router>,
  document.getElementById('root')
);

// Enable hot module if available
if (module.hot) {
  module.hot.accept();
}
