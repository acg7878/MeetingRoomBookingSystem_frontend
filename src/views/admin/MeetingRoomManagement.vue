<template>
  <div>
    <el-row class="mb-4">
      <el-button type="primary" @click="openCreateDialog">新增会议室</el-button>
    </el-row>

    <el-table :data="pagedMeetingRooms" border style="width: 100%">
      <el-table-column label="会议室名称" prop="roomName" align="center" />
      <el-table-column label="会议室类型" prop="roomType" align="center" />
      <el-table-column label="座位数" prop="seatCount" align="center" />
      <el-table-column label="价格/小时" prop="pricePerHour" align="center" />
      <el-table-column prop="status" label="状态" align="center">
        <template #default="{ row }">
          <el-tag :type="statusColorMap[row.status]" disable-transitions>
            {{ statusMap[row.status] || row.status }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template v-slot="scope">
          <el-button
            @click="openUpdateDialog(scope.row)"
            type="primary"
            size="small"
            plain
            >修改</el-button
          >
          <el-button
            @click="deleteMeetingRoomHandle(scope.row.roomName)"
            type="danger"
            size="small"
            plain
            >删除</el-button
          >
          <el-button
            @click="openDetailDialog(scope.row)"
            type="info"
            size="small"
            plain
            >详细</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="meetingRooms.length"
    >
    </el-pagination>

    <!-- 新增会议室对话框 -->
    <el-dialog v-model="createDialogVisible" title="新增会议室" width="40%">
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
        <el-form-item label="租赁价格" prop="pricePerHour">
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
    <el-dialog v-model="updateDialogVisible" title="修改会议室" width="40%">
      <el-form
        :model="updateForm"
        ref="updateFormRef"
        :rules="updateRules"
        label-width="100px"
      >
        <el-form-item label="会议室名称" prop="newRoomName">
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
        <el-form-item label="租赁价格" prop="pricePerHour">
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
    <!-- 修改后的详细对话框 -->
    <el-dialog v-model="detailDialogVisible" title="会议室详情" width="40%">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="会议室名称">{{ detailForm.roomName }}</el-descriptions-item>
        <el-descriptions-item label="会议室类型">{{ roomTypeMap[detailForm.roomType] || detailForm.roomType }}</el-descriptions-item>
        <el-descriptions-item label="座位数">{{ detailForm.seatCount }}</el-descriptions-item>
        <el-descriptions-item label="价格/小时">{{ detailForm.pricePerHour }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="statusColorMap[detailForm.status]" disable-transitions>
            {{ statusMap[detailForm.status] || detailForm.status }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="设备">
          <el-tag
            v-for="(equipment, index) in detailForm.equipments"
            :key="index"
            style="margin-right: 8px; margin-bottom: 8px"
          >
            {{ equipment }}
          </el-tag>
          <span v-if="detailForm.equipments.length === 0">暂无设备</span>
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>
</div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { ElNotification, ElMessageBox, type FormInstance } from "element-plus"; // 新增导入ElMessageBox

import {
  createMeetingRoom,
  deleteMeetingRoom,
  getMeetingRoomEquipment,
  getMeetingRoomList,
  updateMeetingRoom,
} from "@/api/meetingRoom_old";
import type {
  MeetingRoom,
  MeetingRoomCreateData,
  MeetingRoomUpdateData,
} from "@/api/meetingRoom_old/index.types"; // 导入会议室相关类型定义

import {
  statusMap,
  statusColorMap,
  roomTypeMap,
  statusMapReverse,
  roomTypeMapReverse,
} from "@/constants/meetingRoom";

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
const createFormRef = ref<FormInstance>();

// 更新会议室表单数据模型
const updateForm = ref<MeetingRoomUpdateData>({
  oldRoomName: "",
  newRoomName: "",
  roomType: "classroom",
  seatCount: 0,
  pricePerHour: 0,
  status: "available",
});
const updateFormRef = ref<FormInstance>();

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
  oldRoomName: [
    { required: true, message: "请输入会议室名称", trigger: "blur" },
  ],
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
  try {
    //console.log("fetchMeetingRooms");
    const response = await getMeetingRoomList();
    if (response.code === 200) {
      meetingRooms.value = response.data;
    } else {
      ElNotification({
        title: "错误",
        message: response.message || "获取会议室列表失败",
        type: "error",
      });
    }
  } catch (error) {
    console.error("获取会议室列表异常:", error);
    ElNotification({
      title: "错误",
      message: "网络请求异常，请检查网络连接",
      type: "error",
    });
  }
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
const createMeetingRoomHandler = () => {
  if (!createFormRef.value) return;

  createFormRef.value.validate(async (valid) => {
    if (!valid) return;

    try {
      const response = await createMeetingRoom(createForm.value); // 调用后端接口

      // 检查后端返回的状态码或结果
      if (response.code === 200) {
        ElNotification({
          title: "成功",
          message: "会议室创建成功",
          type: "success",
        });
        createDialogVisible.value = false;
        fetchMeetingRooms(); // 刷新会议室列表
      } else {
        ElNotification({
          title: "错误",
          message: response.message || "会议室创建失败",
          type: "error",
        });
      }
    } catch (error) {
      // 捕获网络或其他异常
      ElNotification({
        title: "错误",
        message: "网络请求失败，请稍后重试",
        type: "error",
      });
    }
  });
};

// 更新现有会议室
const updateMeetingRoomHandler = () => {
  if (!updateFormRef.value) return;
  updateFormRef.value.validate(async (valid) => {
    if (!valid) return;

    const submitData = {
      ...updateForm.value,
      roomType: roomTypeMapReverse[updateForm.value.roomType] || updateForm.value.roomType,
      status: statusMapReverse[updateForm.value.status] || updateForm.value.status
    };

    // console.log(
    //   "正在提交的表单数据:",
    //   JSON.stringify(updateForm.value, null, 2)
    // );
    try {
      await updateMeetingRoom(submitData);
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
  });
};

// 删除会议室
const deleteMeetingRoomHandle = async (roomName: string) => {
  console.log(roomName);
  try {
    await ElMessageBox.confirm(`确定要删除会议室 "${roomName}" 吗?`, "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    });
  } catch {
    // 用户取消操作，无需任何提示
    return;
  }

  try {
    const response = await deleteMeetingRoom(roomName);

    // 判断后端返回的状态码或消息
    if (response.code === 400) {
      ElNotification({
        title: "错误",
        message: response.message,
        type: "error",
      });
    } else {
      ElNotification({
        title: "成功",
        message: "会议室删除成功",
        type: "success",
      });
      fetchMeetingRooms();
    }
  } catch (error) {
    // 针对其他错误类型的处理
    ElNotification({
      title: "错误",
      message: "会议室删除失败",
      type: "error",
    });
  }
};

// 初始化获取会议室列表
fetchMeetingRooms();

const mappedMeetingRooms = computed(() => {
  return meetingRooms.value.map((room) => ({
    ...room,
    status: statusMap[room.status] || room.status,
    roomType: roomTypeMap[room.roomType] || room.roomType,
  }));
});

// 分页相关数据
const currentPage = ref(1);
const pageSize = ref(10);

// 计算当前页显示的数据
const pagedMeetingRooms = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return mappedMeetingRooms.value.slice(start, end);
});

// 每页条数变化
const handleSizeChange = (val: number) => {
  pageSize.value = val;
};

// 当前页变化
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
};
const detailDialogVisible = ref(false);
const loadingEquipment = ref(false);

const detailForm = ref({
  roomName: '',
  roomType: '',
  seatCount: 0,
  pricePerHour: 0,
  status: '',
  equipments: [] as string[]
});

const openDetailDialog = async (room: MeetingRoom) => {
  try {
    loadingEquipment.value = true;
    const response = await getMeetingRoomEquipment(room.roomName);
    detailForm.value = {
      roomName: room.roomName,
      roomType: room.roomType,
      seatCount: room.seatCount,
      pricePerHour: room.pricePerHour,
      status: room.status,
      equipments: response.data
    };
    detailDialogVisible.value = true;
  } catch (error) {
    ElNotification({
      title: '错误',
      message: '获取会议室详情失败',
      type: 'error'
    });
  } finally {
    loadingEquipment.value = false;
  }
};
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

.el-pagination {
  margin-top: 20px;
  justify-content: flex-end;
}
</style>
