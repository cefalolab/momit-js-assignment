import { createStore, combineReducers } from 'redux';
import auth from './modules/auth.store';

const store = createStore(
  combineReducers({
    auth,
  })
);

export default store;
