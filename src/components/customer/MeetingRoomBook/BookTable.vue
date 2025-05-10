<template>
  <el-table :data="meetingRooms" border style="width: 100%">
    <el-table-column prop="roomName" label="会议室名称" align="center" />
    <el-table-column prop="seatCount" label="容纳人数" align="center" />
    <el-table-column prop="roomType" label="类型" align="center" />
    <el-table-column prop="pricePerHour" label="每小时价格" align="center" />
    <el-table-column label="操作" align="center">
      <template #default="{ row }">
        <el-button type="primary" size="small" @click="bookRoom(row.roomName)"
          >预订</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { useMeetingRoomBookStore } from "@/stores/modules/customer/meetingRoomBookStore";
import { storeToRefs } from "pinia";

// 使用 Pinia 的 store
const meetingRoomBookStore = useMeetingRoomBookStore();
// 从 store 中获取会议室列表
const { meetingRooms } = storeToRefs(meetingRoomBookStore);

// 预订会议室
const bookRoom = (roomName: string) => {
  console.log("预订会议室：", roomName);
  // 在这里可以调用 store 的方法处理预订逻辑
};
</script>

<style scoped>
.equipment-item {
  margin-right: 5px;
}
</style>
