import { onMounted, ref } from "vue";
import { getUserList } from "@/api/user";
import type { User } from "@/types/user";
import { defineStore } from "pinia";
import dayjs from "dayjs";

export const useUsersStore = defineStore("users", () => {
  const users = ref<User[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await getUserList();
      if (response.code === 200) {
        users.value = response.data.map((user: User) => ({
          username: user.username,
          email: user.email,
           createdAt: dayjs(user.createdAt).format("YYYY-MM-DD HH:mm:ss"), // 格式化创建时间
          updatedAt: dayjs(user.updatedAt).format("YYYY-MM-DD HH:mm:ss"), // 格式化更新时间
        }));
      } else {
        console.error("获取用户列表失败：", response.message);
      }
    } catch (error) {
      console.error("获取用户列表失败：", error);
    }
  };

  return {
    users,
    fetchUsers,
  };
});
