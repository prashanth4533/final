import axios from 'axios';

// Set up Axios instance with a base URL
const API = axios.create({
    baseURL: 'http://127.0.0.1:8000', // Replace with your Django backend URL if different
});

// Automatically include JWT token if it exists
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;
