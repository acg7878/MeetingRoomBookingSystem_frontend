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

<style lang="scss" scoped>
.el-aside {
  position: fixed;
  top: 60px; /* Header 高度 */
  left: 0;
  bottom: 0;
  width: 200px; /* 根据你的侧边栏宽度调整 */
  height: calc(100vh - 60px); /* 减去 Header 高度 */
  overflow-y: auto;
  background-color: #fff; /* 可选 */
  z-index: 0;
}


.el-header {
  width: 100%; 
  position: fixed; 
  z-index: 1; 
}

.el-container:nth-child(2) {
  padding-top: 60px; /* 顶部偏移 Header */
  margin-left: 200px; /* 与侧边栏宽度一致 */
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


