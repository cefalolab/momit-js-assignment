import { getLocalItem } from './local-storage-handler';

// unique id generator for cart item
export const generateCartItemUid = (id, color, size) =>
  `${id}.${color}.${size}`;

// set authorization header for API call
export const withAuthorizationHeader = () => ({
  Authorization: `Bearer ${getLocalItem('token')}`,
});
