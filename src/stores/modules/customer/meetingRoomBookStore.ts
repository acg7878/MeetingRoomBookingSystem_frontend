import { defineStore } from "pinia";
import { ref } from "vue";
import { getEquipmentList } from "@/api/equipment";
import type { MeetingRoomFliterData } from "@/api/meetingRoom/index.types";
import { getMeetingRoomByFilter } from "@/api/meetingRoom";
import { ElMessage } from "element-plus";
import dayjs from "dayjs";
export const useMeetingRoomBookStore = defineStore("meetingRoomBook", () => {
  // 筛选条件
  const filterForm = ref({
    startTime: "", // 开始时间
    endTime: "", // 结束时间
    attendees: 1, // 参会人数
    equipment: [], // 所需设备
  });
  // 筛选后的会议室列表
  const meetingRooms = ref<MeetingRoomFliterData[]>([]);
  const equipmentList = ref<string[]>([]);
  // 加载状态
  const isLoading = ref(false);

  const fetchEquipmentList = async () => {
    const response = await getEquipmentList();
    if (response.code === 200) {
      equipmentList.value = response.data;
    } else {
      ElMessage.error(`获取设备列表失败：${response.message}`);
    }
  };
  const filterMeetingRooms = async () => {
    isLoading.value = true;
    try {
      const response = await getMeetingRoomByFilter({
        startTime: dayjs(filterForm.value.startTime).format("YYYY-MM-DDTHH:mm:ss"),
        endTime: dayjs(filterForm.value.endTime).format("YYYY-MM-DDTHH:mm:ss"),
        attendees: filterForm.value.attendees,
        equipment: filterForm.value.equipment,
      });
      console.log("后端返回的数据：", response.data); // 打印返回的数据
      if (response.code === 200) {
        meetingRooms.value = response.data;
      } else {
        ElMessage.error(`筛选会议室失败：${response.message}`);
      }
    } catch (error) {
      console.error("筛选会议室失败：", error);
      ElMessage.error("筛选会议室失败，请稍后重试！");
    } finally {
      isLoading.value = false;
    }
  };

  return {
    filterForm,
    meetingRooms,
    equipmentList,
    isLoading,
    fetchEquipmentList,
    filterMeetingRooms,
  };
});
