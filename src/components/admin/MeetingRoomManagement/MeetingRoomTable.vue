<template>
  <div>
    <!-- 新增会议室按钮 -->
    <el-button type="primary" @click="openCreateDialog" class="mb-4 add-margin">新增会议室</el-button>
    <el-table :data="meetingRooms" border style="width: 100%" >
      <!-- 会议室名称 -->
      <el-table-column prop="roomName" label="会议室名称" align="center" />
      <!-- 会议室类型 -->
      <el-table-column prop="roomType" label="会议室类型" align="center">
        <template #default="{row}">
            {{ roomTypeMap[row.roomType] }}
        </template>
      </el-table-column>
      <!-- 座位数 -->
      <el-table-column prop="seatCount" label="座位数" align="center" />
      <!-- 价格/小时 -->
      <el-table-column prop="pricePerHour" label="价格/小时" align="center" />
      <!-- 状态 -->
      <el-table-column prop="status" label="状态" align="center">
        <template #default="{ row }">
          <el-tag :type="statusColorMap[row.status]">
            {{ statusMap[row.status] }}
          </el-tag>
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <el-button type="primary" size="small" plain>修改</el-button>
          <el-button type="danger" size="small" plain>删除</el-button>
          <el-button type="info" size="small" plain>详细</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { useMeetingRoomStore } from "@/stores/modules/admin/meetingRoomStore";
import { computed, onMounted } from "vue";
import { statusMap, statusColorMap, roomTypeMap } from "@/constants/meetingRoom"; // 状态映射

const meetingRoomStore = useMeetingRoomStore();
const meetingRooms = computed(() => meetingRoomStore.meetingRooms); // 获取会议室数据


// 方法
const openCreateDialog = () => {
    meetingRoomStore.createDialogVisible = true
}

onMounted(() => {
  meetingRoomStore.fetchMeetingRooms(); // 初始化获取会议室列表
});
</script>

<style lang="scss" scoped>
.add-margin {
  margin-bottom: 20px; /* 下方增加 20px 间距 */
  margin-top: 10px;    /* 上方增加 10px 间距（可选） */
}
</style>