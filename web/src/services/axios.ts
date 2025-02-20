import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_URL,
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

axiosInstance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response.status === 401) {
    localStorage.removeItem('tokens');
    window.location.href = '/auth/login';
  }
  return error;
})

export default axiosInstance;
