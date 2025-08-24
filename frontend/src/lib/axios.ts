import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});