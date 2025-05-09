import axios from "axios";
import { takeAccessToken } from "@/api/auth";

import type { User, ResponseData } from "@/types/user";

const BASE_URL = "http://localhost:8080";

// 添加 Axios 请求拦截器，自动附加 Authorization 头
axios.interceptors.request.use((config) => {
  const token = takeAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 通用请求处理函数
const handleRequest = async <T>(
  request: Promise<any>
): Promise<ResponseData<T>> => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return (
        error.response?.data || {
          code: 500,
          message: "请求失败",
          data: null,
        }
      );
    }
    throw error;
  }
};

// 获取用户列表
export const getUserList = () =>
  handleRequest<User[]>(axios.get(`${BASE_URL}/user/list`));