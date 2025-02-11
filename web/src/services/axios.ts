import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    // timeout: 5000,
    headers: {'Content-Type': 'application/json'}
  });


axiosInstance.interceptors.request.use(function (config) {
  const tokens = localStorage.getItem('tokens');
  if (tokens) {
      const parsedTokens = JSON.parse(tokens);
      const accessToken = parsedTokens.access;
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  }, function (error) {
    return error;
})

export default axiosInstance;
