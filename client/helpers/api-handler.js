import axios from 'axios';

// base url
// eslint-disable-next-line
const DOMAIN_NAME = process.env.DOMAIN_NAME;
// eslint-disable-next-line
const PORT = process.env.PORT;

axios.defaults.baseURL = `${DOMAIN_NAME}:${PORT}/api`;

// request handlers
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
