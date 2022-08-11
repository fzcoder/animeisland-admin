import _axios from 'axios';
import axiosInstance from "./axios";

const http = _axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL,
  timeout: 10000
})

// axios请求拦截器
http.interceptors.request.use(config => {
  // 请求携带token令牌
  config.headers.authorization = 'Bearer ' + localStorage.getItem('accessToken')
  return config
})

// axios响应拦截器
http.interceptors.response.use(
  response => {
    const result = response.data;
    // 判断状态(当code等于0时代表成功，其余情况均为出错)
    switch(result.code) {
      case 0: // SC_OK = 0;
        break;
      case 1: // SC_BAD_REQUEST = 1;
        break;
      case 2: // SC_UNAUTHORIZED = 2;
        setTimeout(() => {
          requiredAuth();
        }, 1500);
        break;
      case 3: // SC_NOT_FOUND = 3;
        break;
      case 4: // SC_INTERNAL_SERVER_ERROR = 4;
        break;
      default:
        break;
    }
    return response
  },
  error => {
    return Promise.reject(error);
  }
)

const requiredAuth = () => {
  localStorage.clear();
  window.location.href = '/login';
}

export const axios = http;

export default axiosInstance;
