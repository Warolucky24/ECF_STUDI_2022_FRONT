import { createRouter, createWebHistory } from 'vue-router'
import ConnectView from '@/views/Connect.view.vue'
import {APP_ROUTES} from "@/features/app/AppRouter";
import {isConnectGuard, isNoConnectGuard} from "@/shared/guards/auth.guard";
import {useUserStore} from "@/stores/userStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect : "/connect"
    },
    {
      path: '/connect',
      beforeEnter: [isNoConnectGuard],
      component: ConnectView
    },
    {
      path: "/app/",
      beforeEnter: [isConnectGuard],
      component: () => import("@/features/app/HomeApp.vue"),
      children: APP_ROUTES

    },
    {
      path: '/:wild(.*)',
      component: () => import("@/components/NotFound.vue")
    }
  ]
})

export default router
