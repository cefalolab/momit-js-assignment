// Actions
const ADD = 'cart/ADD';
const REMOVE = 'cart/REMOVE';

// Action Creators
export function addToCart(productId, variant) {
  const id = `${productId}.${variant.color}.${variant.size}}`;
  return { type: ADD, payload: { id, productId, variant } };
}

export function removeFromCart(id) {
  return { type: REMOVE, payload: { id } };
}

// Reducer
// sample data
/*
  {id: String, productId: Number, variant: {color: String, size: String} }
*/

const initialState = [];

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD: {
      return [
        ...state,
        {
          id: action.payload.id,
          productId: action.payload.productId,
          variant: action.payload.variant,
        },
      ];
    }
    case REMOVE:
      return state.filter(({ id }) => id !== action.payload.id);
    default:
      return state;
  }
}
