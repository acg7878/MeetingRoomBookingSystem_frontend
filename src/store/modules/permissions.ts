// rc/store/modules/permissions.ts:
import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";
import type { RouteRecordRaw } from "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    roles?: string[];
    title?: string;
  }
}

interface IPermissionStore {
  authRoutes: RouteRecordRaw[];
  hasRoutes: boolean;
}

export const usePermissionStore = defineStore("permission", () => {
  const store: IPermissionStore = reactive({
    authRoutes: [],
    hasRoutes: false,
  });

  const setAuthRoutes = (routes: RouteRecordRaw[]) => {
    store.authRoutes = routes;
    store.hasRoutes = true;
  };

  const filterAuthRoutes = (routes: RouteRecordRaw[], role: string) => {
    return routes.filter((route) => {
      // 如果路由没有设置roles，则默认允许访问
      if (!route.meta?.roles) return true;
      // 检查用户角色是否在路由允许的角色列表中
      return route.meta.roles.includes(role);
    });
  };

  const resetAuthRoutes = () => {
    store.authRoutes = [];
    store.hasRoutes = false;
  };

  return {
    ...toRefs(store),
    setAuthRoutes,
    filterAuthRoutes,
    resetAuthRoutes,
  };
});
