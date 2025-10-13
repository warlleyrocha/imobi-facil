//services/api.ts
import axios from 'axios';
import { Platform } from 'react-native';

export const API_URL = Platform.select({
  android: 'http://10.0.2.2:3000',
  ios: 'http://192.168.1.1:3000',
  web: 'http://localhost:3000',
}) as string;

export const api = axios.create({
  baseURL: API_URL,
});
