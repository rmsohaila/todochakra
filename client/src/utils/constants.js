import axios from 'axios';
export const API_URL = 'https://localhost:7189/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-type': 'application/json',
  },
});
