<template>
  <el-aside :width="isCollapse ? '64px' : '200px'" class="sidebar">
    <el-menu
      mode="vertical"
      :collapse="isCollapse"
      :collapse-transition="false"
      router
    >
      <!-- 移除仪表盘菜单项 -->
      <el-sub-menu index="2" class="menu-item">
        <template #title>
          <el-icon><Document /></el-icon>
          <span>预订管理</span>
        </template>
        <el-menu-item index="/bookings">预订记录</el-menu-item>
        <el-menu-item index="/rooms">会议室管理</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="3" class="menu-item">
        <template #title>
          <el-icon><User /></el-icon>
          <span>用户管理</span>
        </template>
        <el-menu-item index="/users">用户列表</el-menu-item>
        <el-menu-item index="/roles">角色管理</el-menu-item>
      </el-sub-menu>
    </el-menu>
    <el-button
      class="toggle-button"
      @click="toggleCollapse"
      :icon="isCollapse ? ArrowRight : ArrowLeft"
    ></el-button>
  </el-aside>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { House, Document, User, ArrowLeft, ArrowRight } from '@element-plus/icons-vue';

const isCollapse = ref(false);

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value;
};
</script>

<style scoped>
.sidebar {
  transition: width 0.3s;
}

.menu-item {
  transition: transform 0.3s;
}

.menu-item:hover {
  transform: translateX(5px);
}

.toggle-button {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}
</style>