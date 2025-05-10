<template>
  <el-table :data="meetingRooms" border style="width: 100%">
    <el-table-column prop="roomName" label="会议室名称" align="center" />
    <el-table-column prop="seatCount" label="容纳人数" align="center" />
     <el-table-column label="类型" align="center">
      <template #default="{ row }">
        {{ roomTypeMap[row.roomType] || "未知类型" }}
      </template>
    </el-table-column>
    <el-table-column prop="pricePerHour" label="每小时价格" align="center" />
    <el-table-column label="操作" align="center">
      <template #default="{ row }">
        <el-button type="primary" size="small" @click="openBookingDialog(row)">预订</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="isDialogVisible" title="确认预订" width="400px">
    <el-row>
      <el-col :span="8" class="dialog-label">会议室名称：</el-col>
      <el-col :span="16">{{ selectedRoom?.roomName }}</el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="8" class="dialog-label">开始时间：</el-col>
      <el-col :span="16">{{ formattedStartTime }}</el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="8" class="dialog-label">结束时间：</el-col>
      <el-col :span="16">{{ formattedEndTime }}</el-col>
    </el-row>
    <el-divider></el-divider>
    <el-space class="dialog-actions" justify="end">
      <el-button @click="isDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="confirmBooking">确认</el-button>
    </el-space>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useMeetingRoomBookStore } from "@/stores/modules/customer/meetingRoomBookStore";
import { storeToRefs } from "pinia";
import { ElMessage } from "element-plus";
import dayjs from "dayjs";
import type { RoomType } from "@/api/meetingRoom/index.types";
import { takeAccessToken } from "@/api/auth";
import { jwtDecode } from "jwt-decode";
import { roomTypeMap } from "@/constants/meetingRoom"; 
// 使用 Pinia 的 store
const meetingRoomBookStore = useMeetingRoomBookStore();
const { meetingRooms, filterForm } = storeToRefs(meetingRoomBookStore);

// 对话框状态
const isDialogVisible = ref(false);

// 选中的会议室，类型明确
const selectedRoom = ref<{
  roomName: string;
  roomType: RoomType;
  seatCount: number;
  pricePerHour: number;
} | null>(null);

// 格式化时间
const formattedStartTime = computed(() =>
  filterForm.value.startTime
    ? dayjs(filterForm.value.startTime).format("YYYY-MM-DD HH:mm:ss")
    : ""
);
const formattedEndTime = computed(() =>
  filterForm.value.endTime
    ? dayjs(filterForm.value.endTime).format("YYYY-MM-DD HH:mm:ss")
    : ""
);

// 打开预订对话框
const openBookingDialog = (row: {
  roomName: string;
  roomType: RoomType;
  seatCount: number;
  pricePerHour: number;
}) => {
  selectedRoom.value = row;
  isDialogVisible.value = true;
};

// 确认预订
const confirmBooking = async () => {
  if (!selectedRoom.value) {
    ElMessage.error("未选择会议室！");
    return;
  }

  // 调用 takeAccessToken 获取 token
  const token = takeAccessToken();
  if (!token) {
    // 如果 token 不存在，takeAccessToken 已经处理了提示逻辑
    return;
  }
  const username = jwtDecode<{ username: string }>(token).username;

  const bookingData = {
    meetingRoomName: selectedRoom.value.roomName,
    customerName: username,
    startTime: filterForm.value.startTime,
    endTime: filterForm.value.endTime,
  };

  // 直接调用 store 中的 bookMeetingRoomAction 方法
  await meetingRoomBookStore.bookMeetingRoomAction(bookingData);

  // 关闭对话框
  isDialogVisible.value = false;
};
</script>

<style scoped>
.dialog-label {
  font-weight: bold;
  color: #606266;
}
.dialog-actions {
  margin-top: 20px;
}
.equipment-item {
  margin-right: 5px;
}
</style>
