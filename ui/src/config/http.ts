import axios from 'axios';

export const http = axios.create({
  baseURL: 'https://dev.api.barbago.app/',
  // The authorization header token will be updated
  // whenever firebase auth state changes.
});
