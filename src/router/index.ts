import { createRouter, createWebHashHistory } from "vue-router";
import { unauthorized } from "@/api/auth";

export const staticRoutes = [
  {
    path: "/",
    name: "welcome",
    component: () => import("../views/welcome/WelcomeView.vue"),
    children: [
      {
        path: "/",
        name: "welcome-login",
        component: () => import("../views/welcome/LoginPage.vue"),
      },
      {
        path: "register",
        name: "welcome-register",
        component: () => import("../views/welcome/RegisterPage.vue"),
      },
      {
        path: "forget",
        name: "welcome-forget",
        component: () => import("../views/welcome/ForgetPage.vue"),
      },
    ],
  },
  {
    path: "/index",
    name: "index",
    component: () => import("../layout/AppLayout.vue"),
    children: [
      {
        path: "", // 默认子路由，进入 /index 时显示
        name: "index-welcome",
        component: () => import("@/components/layout/Welcome.vue"),
      },
    ],
  },
  {
    path: "/403",
    name: "403",
    component: () => import("../views/error/403.vue"),
    meta: { title: "403 禁止访问" },
  },
  {
    path: "/404",
    name: "404",
    component: () => import("../views/error/404.vue"),
    meta: { title: "404 页面未找到" },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/error/404.vue"),
    meta: { title: "404 页面未找到" },
  },
];

export const dynamicRoutes = [
  {
    path: "/admin/meeting-rooms",
    name: "MeetingRoomSetting",
    meta: { title: "MeetingRoomSetting", roles: ["admin"] },
    component: () => import("@/views/admin/MeetingRoomSetting.vue"),
  },
  {
    path: "/admin/orders",
    name: "AdminOrders",
    meta: { title: "OrderManagement", roles: ["admin"] },
    //component: () => import('@/views/admin/OrderManagement.vue')
  },
  {
    path: "/admin/users",
    name: "AdminUsers",
    meta: { title: "UserManagement", roles: ["admin"] },
    //component: () => import('@/views/admin/UserManagement.vue')
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRoutes,
});

router.beforeEach((to, from, next) => {
  const isUnauthorized: boolean = unauthorized(); // 检查是否未登录

  if (to.name?.toString().startsWith("welcome") && !isUnauthorized) {
    next("/index");
  } else if (to.fullPath.startsWith("/index") && isUnauthorized) {
    next("/");
  } else {
    next();
  }
});

export default router;
