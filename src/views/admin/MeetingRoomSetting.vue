<template>
  <div>
    <el-row class="mb-4">
      <el-button type="primary" @click="openCreateDialog">新增会议室</el-button>
    </el-row>

    <el-table :data="meetingRooms" border style="width: 100%">
      <el-table-column label="会议室名称" prop="roomName" />
      <el-table-column label="会议室类型" prop="roomType" />
      <el-table-column label="座位数" prop="seatCount" />
      <el-table-column label="价格/小时" prop="pricePerHour" />
      <el-table-column label="状态" prop="status" />

      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button
            @click="openUpdateDialog(scope.row)"
            type="text"
            size="small"
            >修改</el-button
          >
          <el-button
            @click="deleteRoom(scope.row.roomName)"
            type="text"
            size="small"
            style="color: red"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增会议室对话框 -->
    <el-dialog
      :visible.sync="createDialogVisible"
      title="新增会议室"
      width="40%"
    >
      <el-form
        :model="createForm"
        ref="createFormRef"
        :rules="createRules"
        label-width="100px"
      >
        <el-form-item label="会议室名称" prop="roomName">
          <el-input v-model="createForm.roomName" />
        </el-form-item>
        <el-form-item label="会议室类型" prop="roomType">
          <el-select v-model="createForm.roomType" placeholder="选择会议室类型">
            <el-option label="教室" value="classroom" />
            <el-option label="圆桌" value="round_table" />
          </el-select>
        </el-form-item>
        <el-form-item label="座位数" prop="seatCount">
          <el-input-number v-model="createForm.seatCount" :min="1" />
        </el-form-item>
        <el-form-item label="租赁价格（每小时）" prop="pricePerHour">
          <el-input-number v-model="createForm.pricePerHour" :min="0" />
        </el-form-item>
        <el-form-item label="会议室状态" prop="status">
          <el-select v-model="createForm.status" placeholder="选择状态">
            <el-option label="可用" value="available" />
            <el-option label="锁定" value="locked" />
            <el-option label="已预定" value="booked" />
            <el-option label="正在使用" value="in_use" />
            <el-option label="维修中" value="under_maintenance" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="createMeetingRoomHandler"
          >确定</el-button
        >
      </span>
    </el-dialog>

    <!-- 修改会议室对话框 -->
    <el-dialog
      :visible.sync="updateDialogVisible"
      title="修改会议室"
      width="40%"
    >
      <el-form
        :model="updateForm"
        ref="updateFormRef"
        :rules="updateRules"
        label-width="100px"
      >
        <el-form-item label="会议室名称" prop="roomName">
          <el-input v-model="updateForm.newRoomName" />
        </el-form-item>
        <el-form-item label="会议室类型" prop="roomType">
          <el-select v-model="updateForm.roomType" placeholder="选择会议室类型">
            <el-option label="教室" value="classroom" />
            <el-option label="圆桌" value="round_table" />
          </el-select>
        </el-form-item>
        <el-form-item label="座位数" prop="seatCount">
          <el-input-number v-model="updateForm.seatCount" :min="1" />
        </el-form-item>
        <el-form-item label="租赁价格（每小时）" prop="pricePerHour">
          <el-input-number v-model="updateForm.pricePerHour" :min="0" />
        </el-form-item>
        <el-form-item label="会议室状态" prop="status">
          <el-select v-model="updateForm.status" placeholder="选择状态">
            <el-option label="可用" value="available" />
            <el-option label="锁定" value="locked" />
            <el-option label="已预定" value="booked" />
            <el-option label="正在使用" value="in_use" />
            <el-option label="维修中" value="under_maintenance" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="updateMeetingRoomHandler"
          >确定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ElNotification, ElMessageBox } from "element-plus"; // 新增导入ElMessageBox
import {
  createMeetingRoom,
  deleteMeetingRoom,
  getMeetingRoomList,
  updateMeetingRoom,
} from "@/api/meetingRoom";
import type {
  MeetingRoom,
  MeetingRoomCreateData,
  MeetingRoomUpdateData,
} from "@/api/meetingRoom/index.types"; // 导入会议室相关类型定义

// 响应式数据
const meetingRooms = ref<MeetingRoom[]>([]);
const createDialogVisible = ref(false);
const updateDialogVisible = ref(false);

// 创建会议室表单数据模型
const createForm = ref<MeetingRoomCreateData>({
  roomName: "",
  roomType: "classroom",
  seatCount: 0,
  pricePerHour: 0,
  status: "available",
});

// 更新会议室表单数据模型
const updateForm = ref<MeetingRoomUpdateData>({
  oldRoomName: "",
  newRoomName: "",
  roomType: "classroom",
  seatCount: 0,
  pricePerHour: 0,
  status: "available",
});

// 创建会议室表单验证规则
const createRules = {
  roomName: [{ required: true, message: "请输入会议室名称", trigger: "blur" }],
  roomType: [
    { required: true, message: "请选择会议室类型", trigger: "change" },
  ],
  seatCount: [{ required: true, message: "请输入座位数", trigger: "blur" }],
  pricePerHour: [
    { required: true, message: "请输入租赁价格", trigger: "blur" },
  ],
  status: [{ required: true, message: "请选择会议室状态", trigger: "change" }],
};

// 更新会议室表单验证规则
const updateRules = {
  newRoomName: [
    { required: true, message: "请输入会议室名称", trigger: "blur" },
  ],
  roomType: [
    { required: true, message: "请选择会议室类型", trigger: "change" },
  ],
  seatCount: [{ required: true, message: "请输入座位数", trigger: "blur" }],
  pricePerHour: [
    { required: true, message: "请输入租赁价格", trigger: "blur" },
  ],
  status: [{ required: true, message: "请选择会议室状态", trigger: "change" }],
};

// 获取会议室列表
const fetchMeetingRooms = async () => {
  const response = await getMeetingRoomList();
  meetingRooms.value = response.data;
};

// 打开创建会议室对话框
const openCreateDialog = () => {
  createForm.value = {
    roomName: "",
    roomType: "classroom",
    seatCount: 0,
    pricePerHour: 0,
    status: "available",
  };
  createDialogVisible.value = true;
};

// 打开更新会议室对话框
const openUpdateDialog = (room: MeetingRoom) => {
  updateForm.value = {
    oldRoomName: room.roomName,
    newRoomName: room.roomName,
    roomType: room.roomType,
    seatCount: room.seatCount,
    pricePerHour: room.pricePerHour,
    status: room.status,
  };
  updateDialogVisible.value = true;
};

// 创建新会议室
const createMeetingRoomHandler = async () => {
  try {
    await createMeetingRoom(createForm.value);
    ElNotification({
      title: "成功",
      message: "会议室创建成功",
      type: "success",
    });
    createDialogVisible.value = false;
    fetchMeetingRooms();
  } catch (error) {
    ElNotification({
      title: "错误",
      message: "会议室创建失败",
      type: "error",
    });
  }
};

// 更新现有会议室
const updateMeetingRoomHandler = async () => {
  try {
    await updateMeetingRoom(updateForm.value);
    ElNotification({
      title: "成功",
      message: "会议室更新成功",
      type: "success",
    });
    updateDialogVisible.value = false;
    fetchMeetingRooms();
  } catch (error) {
    ElNotification({
      title: "错误",
      message: "会议室更新失败",
      type: "error",
    });
  }
};

// 删除会议室
const deleteRoom = async (roomName: string) => {
  try {
    await ElMessageBox.confirm(`确定要删除会议室 "${roomName}" 吗?`, "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    });
    await deleteMeetingRoom(roomName);
    ElNotification({
      title: "成功",
      message: "会议室删除成功",
      type: "success",
    });
    fetchMeetingRooms();
  } catch (error) {
    if (error !== "cancel") {
      // 如果用户点击"取消"按钮，ElMessageBox会抛出错误，错误内容为"cancel"
      ElNotification({
        title: "错误",
        message: "会议室删除失败",
        type: "error",
      });
    }
  }
};

// 初始化获取会议室列表
fetchMeetingRooms();
</script>

<style lang="scss" scoped>
.mb-4 {
  margin-bottom: 20px;
}

.dialog-footer {
  text-align: right;
  padding: 10px;
}

.el-table {
  margin-bottom: 20px;
}
</style>
