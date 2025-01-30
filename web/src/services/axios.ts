import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'localhost:8000',
    timeout: 1000,
    headers: {'Content-Type': 'application/json'}
  });


axiosInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
});

export default axiosInstance;
