import axios from 'axios';

export const http = axios.create({
  baseURL: 'https://dev.api.barbago.app/',
});
