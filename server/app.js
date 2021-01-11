const express = require('express');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');

const { NODE_ENV } = process.env;

// router
const userRouter = require('./routes/user.routes');
const authRouter = require('./routes/auth.routes');
const productRouter = require('./routes/product.routes');
const cartRouter = require('./routes/cart.routes');

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
app.use('/api', authRouter);
app.use('/api', productRouter);
app.use('/api', cartRouter);

// Serve front-end
app.use(express.static(`${CURRENT_WORKING_DIR}/dist`));
app.use('/', (_, res) => {
  res.sendFile(`${CURRENT_WORKING_DIR}/dist/index.html`);
});

module.exports = app;
