import { getEquipmentList } from "@/api/equipment";
import { getMeetingRoomList } from "@/api/meetingRoom_new";
import type { meetingRoom } from "@/types/meetingRoom";
import { meetingRoomStatus } from "@/constants/meetingRoom"
import { ElMessage, ElNotification } from "element-plus";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useMeetingRoomStore = defineStore("admin_meetingRoom", () => {
  // 实体
  const meetingRooms = ref<meetingRoom[]>([]);
  const equipments = ref<string[]>([]);

  // 状态值
  const createDialogVisible = ref(false);

  // 表单
  const createForm = ref<meetingRoom>({
    roomName: "",
    roomType: "classroom",
    seatCount: 0,
    pricePerHour: 0.0,
    status: meetingRoomStatus.AVAILABLE,
    equipments: [],
  });

  const fetchEquipments = async () => {
    try {
      const response = await getEquipmentList();
      if (response.code === 200) {
        equipments.value = response.data;
      } else [ElMessage(`获取设备列表出错：${response.message}`)];
    } catch (err) {
      ElMessage("获取设备列表出错，请稍后再试");
    }
  };

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

  return {
    // 方法
    fetchMeetingRooms,
    fetchEquipments,

    // 实体
    meetingRooms,
    equipments,

    // 创建会议室
    createDialogVisible,
    createForm,
  };
});
