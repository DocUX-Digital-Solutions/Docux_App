import axios from 'axios';
import { VITE_API_URL } from '@env'; // Load environment variables using react-native-dotenv

const apiClient = axios.create({
  baseURL: VITE_API_URL, // Use the API URL from your environment file
  headers: {
    'Content-Type': 'application/json', // Requests will send JSON by default
  },
});

export default apiClient;
