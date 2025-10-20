//services/api.ts
import axios from 'axios';
import Constants from 'expo-constants';

export const API_URL = Constants.expoConfig?.extra?.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_URL,
});
