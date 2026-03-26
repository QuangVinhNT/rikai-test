import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true, // gửi cookie đi cùng request
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor xử lý lỗi hoặc gắn token
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => Promise.reject(err)
);

// Interceptor xử lý response
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

export default axiosInstance;
