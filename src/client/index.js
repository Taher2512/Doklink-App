import axios from 'axios';

const client = axios.create({
  baseURL: '',
});

client.interceptors.request.use(config => {
  config.headers.set('Cache-Control', 'no-cache');
  config.headers.set('Pragma-Control', 'no-cache');

  return config;
});

export default client;
