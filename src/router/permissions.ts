import { jwtDecode } from "jwt-decode";
import { takeAccessToken } from "@/api/net";
import { usePermissionStore } from "@/store/permissions";

export function setupGlobalGuard(router) {
  router.beforeEach((to, from, next) => {
    const token = takeAccessToken();
    const permissionStore = usePermissionStore();

    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const role = decodedToken.role;
        permissionStore.setUserRoles([role]);
      } catch (error) {
        console.error("解析 token 出错:", error);
      }
    }
    // 权限校验逻辑
    if (to.meta.roles) {
      const hasRequiredRole = to.meta.roles.some((role: string) =>
        permissionStore.hasRole(role)
      );
      if (hasRequiredRole) {
        next();
      } else {
        next("/403");
      }
    } else {
      next();
    }
  });
}
