<template>
  <el-header class="fade-in">
    <div class="header-content">
      <h1>会议室预订系统</h1>
      <div class="right-content">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <el-avatar :size="40" :src="userInfo.avatar"></el-avatar>
            <el-icon class="el-icon-arrow-down el-icon--right"><ArrowDown /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile">个人中心</el-dropdown-item>
              <el-dropdown-item command="settings">设置</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <!-- 删除通知对话框 -->
  </el-header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowDown } from '@element-plus/icons-vue';

const router = useRouter();
const userInfo = ref({
  name: '张三',
  avatar: 'https://example.com/avatar.jpg'
});
// 删除 notificationCount 和 notifications 变量
// 删除 notificationDialogVisible 变量

const handleCommand = (command: string) => {
  switch (command) {
    case 'profile':
      router.push('/profile');
      break;
    case 'settings':
      router.push('/settings');
      break;
    case 'logout':
      // 退出登录逻辑
      localStorage.removeItem('token');
      router.push('/login');
      break;
  }
};
// 删除 showNotifications 函数
</script>

<style scoped>
.fade-in {
  animation: fadeIn 0.5s ease-in-out;
  background-color: #f5f5f5; /* 添加灰色背景 */
  border-bottom: 1px solid #e0e0e0; /* 添加底部边框增强区分度 */
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.header-content {
  display: flex;
  justify-content: space-between; 
  align-items: center;
  height: 100%;
  padding: 0 20px;
  box-sizing: border-box; 
}

.right-content {
  display: flex;
  align-items: center;
}
</style>