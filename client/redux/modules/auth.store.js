// Actions
const LOGIN = 'auth/LOGIN';
const LOGOUT = 'auth/LOGOUT';

// Action Creators
export function loginUser(token, user) {
  return { type: LOGIN, payload: { token, user } };
}

// Reducer
const initialState = {
  loggedIn: false,
  user: {},
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggedIn: Boolean(action.payload.token),
        user: action.payload.user,
      };
    case LOGOUT:
      return {
        ...state,
        loggedIn: false,
        user: {},
      };
    default:
      return state;
  }
}
