const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

const app = require('./server/app');
const { DATABASE_URI, PORT, NODE_ENV, DOMAIN_NAME } = require('./config');

// check .env exist
if (dotenv.error) {
  throw dotenv.error;
}

// Database connection
mongoose
  .connect(DATABASE_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(res => {
    console.log('\nDB connection successful.');
  })
  .catch(err => {
    console.error('\nDB connection fail.', err);
  });

// run server
app.listen(PORT, () => {
  console.log(
    `
    > Server running in ${NODE_ENV} mode.
    > Front-End URL: ${DOMAIN_NAME}:${PORT}
    > Back-End URL: ${DOMAIN_NAME}:${PORT}/api
    `
  );
});
