import { createStore, combineReducers } from 'redux';
import auth from './modules/auth.store';
import cart from './modules/cart.store';

const store = createStore(
  combineReducers({
    auth,
    cart,
  })
);

export default store;
