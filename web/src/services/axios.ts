import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    timeout: 1000,
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
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(function (response) {
  console.log({response});
  return response;
}, function (error) {
  console.log({error});
  return Promise.reject(error);
});

export default axiosInstance;
