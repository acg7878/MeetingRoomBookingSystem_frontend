// src/router/permissions.ts:
import { usePermissionStore } from "@/store/modules/permissions";
import { useUserStore } from "@/store/modules/user";

export function setupDynamicRoutes(router,dynamicRoutes) {
  router.beforeEach(async (to, from, next) => {
    const permissionStore = usePermissionStore();
    const userStore = useUserStore();
    //console.log(router)
    if (!permissionStore.hasRoutes) {
      try {
        const role = userStore.role;
        const accessedRoutes = permissionStore.filterAuthRoutes(dynamicRoutes, role);
        permissionStore.setAuthRoutes(accessedRoutes);
        accessedRoutes.forEach(route => {
          console.log('Adding route:', route)
          router.addRoute("index",route)
        })
        next({ ...to, replace: true })
      } catch (error) {
        console.error('动态路由设置失败:', error)
        next('/500')  // 添加错误处理路径
      }
    } else {
      next()  // 添加else分支确保所有路径都调用next()
    }
  })
}
