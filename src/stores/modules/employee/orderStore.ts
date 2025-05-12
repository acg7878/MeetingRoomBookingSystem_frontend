import { getAllOrders } from "@/api/order";
import type { Order } from "@/types/order";
import { ElMessage } from "element-plus";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useOrderStore = defineStore("employee_order",() => {
    const orders = ref<Order[]>([]);
    const isLoading = ref(false); // 加载状态


    // 获取所有订单
  const fetchAllOrders = async () => {
    isLoading.value = true;
    try {
      const response = await getAllOrders();
      if ( response.code === 200) {
        orders.value = response.data;
      } else {
        ElMessage.error(`获取订单失败：${response.message}`)
      }
    } catch (error) {
      console.error("获取订单失败：", error);
      ElMessage.error("获取订单失败，请稍后重试！");
    } finally {
      isLoading.value = false;
    }
  };

  return{
    fetchAllOrders,
    orders,
    isLoading
  };

})