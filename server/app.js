const express = require('express');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');

const { NODE_ENV } = require('../config');

// router
const userRouter = require('./routes/user.routes');

const app = express();
const CURRENT_WORKING_DIR = process.cwd();

// middleware
if (NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(mongoSanitize());

// routes
app.use('/api', userRouter);

// Serve front-end
app.use(express.static(`${CURRENT_WORKING_DIR}/dist`));
app.use('/', (_, res) => {
  res.sendFile(`${CURRENT_WORKING_DIR}/dist/index.html`);
});

module.exports = app;
