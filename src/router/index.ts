import { createRouter, createWebHashHistory } from "vue-router";
import { unauthorized } from "../api/net";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "welcome",
      component: () => import("../views/welcome/WelcomeView.vue"),
      children: [
        {
          path: "/",
          name: "welcome-login",
          component: () => import("../views/welcome/LoginPage.vue"),
        }, {
            path: 'register',
            name: 'welcome-register',
            component: () => import('../views/welcome/RegisterPage.vue')
        }, {
            path: 'forget',
            name: 'welcome-forget',
            component: () => import('../views/welcome/ForgetPage.vue')
        }
      ],
    },
    {
      path: "/index",
      name: "index",
      component: () => import("../views/IndexView.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isUnauthorized: boolean = unauthorized();

  if (to.name?.toString().startsWith("welcome") && !isUnauthorized) {
    next("/index");
  } else if (to.fullPath.startsWith("/index") && isUnauthorized) {
    next("/");
  } else {
    next();
  }
});

export default router;
