<template>
  <div>
    <el-alert
      title="30分钟未付款将自动取消订单！"
      type="info"
      show-icon
      class="mb-4"
    />
    <el-table :data="orders" border style="width: 100%">
      <el-table-column
        prop="meetingRoomName"
        label="会议室名称"
        align="center"
      />
      <el-table-column label="订单创建时间" align="center">
        <template #default="{ row }">
          {{ formatTimestamp(row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column label="订单更新时间" align="center">
        <template #default="{ row }">
          {{ formatTimestamp(row.updateTime) }}
        </template>
      </el-table-column>
      <el-table-column label="开始时间" align="center">
        <template #default="{ row }">
          {{ formatTimestamp(row.startTime) }}
        </template>
      </el-table-column>
      <el-table-column label="结束时间" align="center">
        <template #default="{ row }">
          {{ formatTimestamp(row.endTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="totalPrice" label="总价格" align="center" />
      <el-table-column prop="paymentStatus" label="支付状态" align="center">
        <template #default="{ row }">
          <el-tag :type="STATUS_TAG_TYPE[row.paymentStatus]">
            {{ STATUS_MAP[row.paymentStatus] }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <el-button
            v-if="row.paymentStatus === 'unpaid'"
            type="success"
            size="small"
            @click="onPayOrder(row.orderId)"
          >
            支付
          </el-button>
          <el-tooltip
            v-if="
              row.paymentStatus === 'unpaid' || row.paymentStatus === 'paid'
            "
            :content="
              isCancelDisabled(row) ? '已经开始，无法取消' : '请求取消订单'
            "
            placement="top"
          >
            <el-button
              type="danger"
              size="small"
              :disabled="isCancelDisabled(row)"
              @click="onCancelOrder(row.orderId)"
            >
              取消
            </el-button>
          </el-tooltip>
          <el-button
            v-if="row.paymentStatus === 'cancelled'"
            type="warning"
            size="small"
            disabled
          >
            已取消
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { useOrderStore } from "@/stores/modules/customer/orderStore";
import { STATUS_MAP, STATUS_TAG_TYPE } from "@/constants/order"; // 引入状态映射常量
import { computed } from "vue";
import { ElMessageBox } from "element-plus";
import { formatTimestamp } from "@/utils/time"; // 引入时间格式化工具函数

const orderStore = useOrderStore();
const orders = computed(() => orderStore.orders); // 从 Store 获取订单数据

// 支付订单
const onPayOrder = async (orderId: number) => {
  try {
    await ElMessageBox.confirm("确定要支付该订单吗？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    });
    await orderStore.payOrder(orderId); // 调用 Store 中的支付订单方法
  } catch (error) {
    console.log("支付操作被用户中止或发生错误：", error);
  }
};

// 判断是否禁用取消按钮
const isCancelDisabled = (row: { startTime: number }): boolean => {
  const now = Date.now();
  return now >= row.startTime; // 如果当前时间大于等于开始时间，则禁用按钮
};

// 取消订单
const onCancelOrder = async (orderId: number) => {
  try {
    await ElMessageBox.confirm("确定要取消该订单吗？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    });
    await orderStore.cancelOrder(orderId); // 调用 Store 中的取消订单方法
  } catch (error) {
    console.log("取消操作被用户中止或发生错误：", error);
  }
};
</script>

<style scoped lang="scss"></style>
