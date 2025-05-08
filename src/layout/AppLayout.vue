<template>
  <el-container>
    <Header />
    <el-container>
      <Sidebar />
      <el-main>
        <router-view v-slot="{ Component }">
          <transition name="fade-transform" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Header from '@/components/layout/AppHeader.vue';
import Sidebar from '@/components/layout/AppSidebar.vue';
</script>

<style scoped>
.el-aside {
  float: left; 
  height: 100vh; 
  position: fixed; /* 固定侧边栏位置 */
  top: 60px; /* 根据头部高度调整 */
  left: 0;
  z-index: 0; /* 确保侧边栏层级低于头部 */
}

.el-header {
  width: 100%; 
  position: fixed; 
  z-index: 1; 
}

.el-container:nth-child(2) {
  padding-top: 60px; 
  padding-left: 200px; /* 根据侧边栏宽度调整 */
}

.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: all 0.5s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>


