<template>
  <div>
    <el-button @click="userLogout">退出登录</el-button>
  </div>
</template>

<script setup>
import { logout } from "../api/net";
import router from "@/router";

const userLogout = () => {
  logout(() => router.push("/"))
}
</script>

<style scoped></style>
