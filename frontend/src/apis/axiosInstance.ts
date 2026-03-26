import axios from "axios";

interface FailedRequest {
  resolve: (token: string | null) => void;
  reject: (error: any) => void; // Lỗi từ Axios thường để any hoặc AxiosError
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // gửi cookie đi cùng request
  headers: {
    'Content-Type': 'application/json'
  }
});

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

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
  async (error) => {
    const originalRequest = error.config;

    // Nếu lỗi 401 và chưa từng thử refresh cho request này
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Nếu đang có 1 request refresh chạy rồi, thì xếp hàng đợi
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => axiosInstance(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Gọi API Refresh Token của NestJS
        // Lưu ý: API này nên được thiết kế để đọc Refresh Token từ HttpOnly Cookie
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/refresh`, {
          withCredentials: true,
        });

        processQueue(null);
        isRefreshing = false;

        // Gửi lại request ban đầu
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;

        // Refresh thất bại (Refresh Token hết hạn) -> Logout
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error.response);
  }
);

export default axiosInstance;
