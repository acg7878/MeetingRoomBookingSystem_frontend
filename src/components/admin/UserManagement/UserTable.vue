<template>
  <el-table :data="userStore.users" border style="width: 100%">
    <el-table-column prop="username" label="用户名" align="center" />
    <el-table-column prop="email" label="邮箱" align="center" />
    <el-table-column prop="createdAt" label="创建时间" align="center" />
    <el-table-column prop="updatedAt" label="最近更新时间" align="center" />
    <el-table-column label="操作" align="center">
      <template #default="scope">
        <el-button type="primary" size="small" plain>编辑</el-button>
        <el-button type="danger" size="small" plain>删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { useUsersStore } from "@/stores/modules/userStore";

const userStore = useUsersStore();
</script>
