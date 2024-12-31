import axios from 'axios';

const apiClient = axios.create({
  baseURL: "https://demo.mydocux.com/api/", // Use the API URL from your environment file
  headers: {
    'Content-Type': 'application/json', // Requests will send JSON by default
  },
});

export default apiClient;
