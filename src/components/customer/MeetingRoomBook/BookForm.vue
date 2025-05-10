<template>
  <el-form :model="filterForm" label-width="120px" class="booking-form">
    <el-form-item label="使用时间">
      <el-date-picker
        v-model="filterForm.startTime"
        type="datetime"
        placeholder="开始时间"
      />
      <el-date-picker
        v-model="filterForm.endTime"
        type="datetime"
        placeholder="结束时间"
      />
    </el-form-item>
    <el-form-item label="参会人数">
      <el-input-number v-model="filterForm.attendees" :min="1" />
    </el-form-item>
    <el-form-item label="所需设备">
      <el-select v-model="filterForm.equipment" multiple placeholder="请选择设备">
        <el-option
          v-for="item in equipmentList"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onFilter">筛选</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { useMeetingRoomBookStore } from "@/stores/modules/customer/meetingRoomBookStore";
import { computed } from "vue";

// 使用 store
const meetingRoomBookStore = useMeetingRoomBookStore();

// 绑定筛选条件
const filterForm = computed(() => meetingRoomBookStore.filterForm);

// 设备列表
const equipmentList = computed(() => meetingRoomBookStore.equipmentList);

// 筛选按钮点击事件
const onFilter = () => {
  meetingRoomBookStore.filterMeetingRooms();
};
</script>

<style scoped>
.booking-form {
  margin-bottom: 20px;
}
</style>