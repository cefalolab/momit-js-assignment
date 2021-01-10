import { getLocalItem } from './local-storage-handler';

export const generateCartItemUid = (id, color, size) =>
  `${id}.${color}.${size}`;

export const getAuthorizationHeader = () => ({
  Authorization: `Bearer ${getLocalItem('token')}`,
});
