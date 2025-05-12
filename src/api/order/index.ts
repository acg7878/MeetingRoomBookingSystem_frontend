import axios from "axios";
import type { ResponseData } from "@/api/meetingRoom_old/index.types";
import type { Order } from "@/types/order";
import { takeAccessToken } from "@/api/auth";

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

// 获取我的订单列表
export const getMyOrders = (username: string) =>
  handleRequest<Order[]>(
    axios.get("/order/my-orders", { params: { username } })
  );

export const cancelMyOrder = (orderId: number) =>
  handleRequest<void>(
    axios.get("/order/cancel", { params: { orderId } }) // 使用 GET 方法传递订单 ID
  );

export const payMyOrder = (orderId: number) =>
  handleRequest<void>(
    axios.get("/order/pay", { params: { orderId } }) // 使用 GET 方法传递订单 ID
  );

export const getAllOrders = () =>
  handleRequest<Order[]>(
    axios.get("/order/all-orders")
  );
