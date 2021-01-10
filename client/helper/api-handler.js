import axios from 'axios';
import { CLIENT_ENV } from '../config';

const { DOMAIN_NAME, PORT } = CLIENT_ENV;
axios.defaults.baseURL = `${DOMAIN_NAME}:${PORT}/api`;

export function getData(url, headers = {}) {
  return axios({
    method: 'GET',
    url,
    headers: { ...headers },
  });
}

export function postData(url, data, headers = {}) {
  return axios({
    method: 'POST',
    url,
    data: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });
}
