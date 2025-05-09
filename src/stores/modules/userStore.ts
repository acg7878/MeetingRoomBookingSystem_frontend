import { computed, ref } from "vue";
import { getUserList } from "@/api/user";
import type { User } from "@/types/user";
import { defineStore } from "pinia";
import dayjs from "dayjs";

export const useUsersStore = defineStore("users", () => {
  const users = ref<User[]>([]);
  const currentPage = ref(1); // 当前页码
  const pageSize = ref(10); // 每页显示条数

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

  const pagedUsers = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return users.value.slice(start, end);
  });

  // 设置当前页码
  const setCurrentPage = (page: number) => {
    currentPage.value = page;
  };

  // 设置每页显示条数
  const setPageSize = (size: number) => {
    pageSize.value = size;
  };

  return {
    users,
    currentPage,
    pageSize,
    pagedUsers,
    setCurrentPage,
    setPageSize,
    fetchUsers,
  };
});
