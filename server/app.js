const express = require('express');
const morgan = require('morgan');
const { NODE_ENV } = require('../config');

const app = express();
const CURRENT_WORKING_DIR = process.cwd();

// middleware
if (NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// routes
app.use('/api', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'You are browsing e-commerce backend api.',
  });
});

// Serve front-end
app.use(express.static(`${CURRENT_WORKING_DIR}/dist`));
app.use('/', (_, res) => {
  res.sendFile(`${CURRENT_WORKING_DIR}/dist/index.html`);
});

module.exports = app;
