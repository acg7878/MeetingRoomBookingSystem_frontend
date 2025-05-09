<template>
  <div style="width: 100%">
    <UserTable />
  </div>
</template>

<script lang="ts" setup>
import { useUsersStore } from "@/stores/modules/userStore";
import UserTable from "@/components/admin/UserManagement/UserTable.vue";
import { onMounted } from "vue";

const userStore = useUsersStore();
onMounted(() => {
  userStore.fetchUsers();
});
</script>
