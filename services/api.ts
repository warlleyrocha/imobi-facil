//services/api.ts
import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL; // ou process.env.API_URL

export const api = axios.create({
  baseURL: API_URL,
});
