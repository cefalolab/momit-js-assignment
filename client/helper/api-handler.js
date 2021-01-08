import axios from 'axios';
import { CLIENT_ENV } from '../config';

const { DOMAIN_NAME, PORT } = CLIENT_ENV;
axios.defaults.baseURL = `${DOMAIN_NAME}:${PORT}/api`;

export function getData(url) {
  return axios({
    method: 'GET',
    url,
  });
}

export function postData(url, data) {
  return axios({
    method: 'POST',
    url,
    data: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
