// Actions
const ADD = 'cart/ADD';
const UPDATE = 'cart/UPDATE';
const REMOVE = 'cart/REMOVE';

// Action Creators
export function addToCart(uid, id, name, color, size, price) {
  return {
    type: ADD,
    payload: {
      uid,
      id,
      name,
      color,
      size,
      price,
      quantity: 1,
      quantityLeft: 0,
    },
  };
}

export function updateToCart(
  uid,
  id,
  name,
  color,
  size,
  price,
  quantity,
  quantityLeft
) {
  return {
    type: UPDATE,
    payload: {
      uid,
      data: { id, name, color, size, price, quantity, quantityLeft },
    },
  };
}

export function removeFromCart(uid) {
  return { type: REMOVE, payload: { uid } };
}

// Reducer
const initialState = [];

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD: {
      return [
        ...state,
        {
          ...action.payload,
        },
      ];
    }
    case UPDATE:
      return state.map(item =>
        item.uid === action.payload.uid
          ? { ...item, ...action.payload.data }
          : item
      );
    case REMOVE:
      return state.filter(({ uid }) => uid !== action.payload.uid);

    default:
      return state;
  }
}
