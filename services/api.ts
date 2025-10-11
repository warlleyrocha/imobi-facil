//services/api.ts
import axios from 'axios';

export const API_URL = 'http://192.168.1.20:3000';

export const api = axios.create({
  baseURL: API_URL,
});
