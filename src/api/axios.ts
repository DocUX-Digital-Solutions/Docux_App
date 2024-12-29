
import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// intercepting requests
API.interceptors.request.use(
  (request) => {
   // handle request here
  },
  (error: AxiosError) => {
   //handle error here
  }
);

//intercepting responses
API.interceptors.response.use(
  (response) => {
   // handle response here
  },
  (error: AxiosError) => {
   //handle error here
  }
);
export {API}
/*
import { fetchAuthSession } from 'aws-amplify/auth'
import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Access-Control-Allow-Headers':
      'Content-Type, Authorization, X-Requested-With',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://*',
    'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
  },
})

console.log(import.meta.env.VITE_API_URL)

apiClient.interceptors.request.use(
  async config => {
    const token = (await fetchAuthSession()).tokens?.accessToken
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

export default apiClient
*/