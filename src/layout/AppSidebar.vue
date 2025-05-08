<template>
  <el-aside :width="isCollapse ? '64px' : '200px'" class="sidebar">
    <el-menu
      mode="vertical"
      :collapse="isCollapse"
      :collapse-transition="false"
      router
      :default-active="$route.path"
    >
      <!-- 公共菜单项 -->
      <el-menu-item index="/index">
        <el-icon><House /></el-icon>
        <span>首页</span>
      </el-menu-item>

      <!-- 预订管理菜单（仅消费者可见） -->
      <el-sub-menu 
      
        index="2" 
        class="menu-item"
        :default-opened="true"
      >
        <template #title>
          <el-icon><Document /></el-icon>
          <span>预订会议室</span>
        </template>
        <el-menu-item index="/bookings">预订记录</el-menu-item>
      </el-sub-menu>

      <!-- 管理员专属菜单 -->
      <el-sub-menu 
      
        index="3" 
        class="menu-item"
      >
        <template #title>
          <el-icon><User /></el-icon>
          <span>系统管理</span>
        </template>
        <el-menu-item index="/admin/meeting-rooms">会议室管理</el-menu-item>
        <el-menu-item index="/admin/orders">订单管理</el-menu-item>
        <el-menu-item index="/admin/users">用户管理</el-menu-item>
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
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { usePermissionStore } from '@/store/modules/permissions';
import { House, Document, User, ArrowLeft, ArrowRight } from '@element-plus/icons-vue';

const isCollapse = ref(false);
const route = useRoute();
const permissionStore = usePermissionStore();

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value;
};

// 检查是否有管理员权限
const hasAdminPermission = computed(() => {
  //return permissionStore.hasRole('admin');
});

// 检查是否有消费者权限
const hasConsumerPermission = computed(() => {
  //return permissionStore.hasRole('consumer');
});
</script>

<style lang="scss" scoped>
.sidebar {
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: auto;
  transition: width 0.3s;
  background-color: var(--el-menu-bg-color);
  box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);

  .el-menu {
    height: 100%;
    border-right: none;
    background-color: transparent;

    &:not(.el-menu--collapse) {
      width: 100%;
    }

    .el-menu-item,
    .el-sub-menu__title {
      color: var(--el-menu-text-color);

      &:hover {
        background-color: var(--el-menu-hover-bg-color);
      }

      &.is-active {
        color: var(--el-menu-active-color);
        background-color: var(--el-menu-active-bg-color);
      }
    }
  }

  .toggle-button {
    position: absolute;
    bottom: 20px;
    left: 20px;
    z-index: 100;
    background-color: rgba(255, 255, 255, 0.2);
    color: var(--el-color-white);
    border: none;
    transition: all 0.3s;

    &:hover {
      background-color: rgba(255, 255, 255, 0.3);
      transform: scale(1.05);
    }
  }
}
</style>

