import { defineStore } from "pinia";

export const usePermissionStore = defineStore("permission", {
  state: () => ({
    userRoles: [] as string[], // 用户角色列表
  }),
  getters: {
    // 检查用户是否具有某个角色
    hasRole: (state) => (role: string) => {
      return state.userRoles.includes(role);
    },
  },
  actions: {
    // 设置用户角色
    setUserRoles(roles: string[]) {
      this.userRoles = roles;
    },
  },
});
