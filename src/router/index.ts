import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
  {
    path: '/',
    redirect: "/home",
  },
  {
    path: '/home',
    component: () => import('@/view/home.vue'),
    children: [
      //用户
      { path: "userApplication", component: () => import("@/components/home/myApplication.vue") },
      { path: "userPaswordLog", component: () => import("@/components/home/passwordlog.vue") },
      { path: "userApply", component: () => import("@/components/home/apply.vue") },
      //管理员
      { path: "adminOrganization", component: () => import("@/components/home/sudo/basic/organization.vue") },
      { path: "adminUser", component: () => import("@/components/home/sudo/basic/users.vue") },
      { path: "adminApplycation", component: () => import("@/components/home/sudo/applycation/applycation.vue") },
      { path: "adminApply", component: () => import("@/components/home/sudo/setting/apply.vue") },
      { path: "adminAuth", component: () => import("@/components/home/sudo/setting/auth.vue") },
      { path: "adminPassword", component: () => import("@/components/home/sudo/setting/passwoed.vue") },
      { path: "adminSecurity", component: () => import("@/components/home/sudo/security/security.vue") },
      { path: "adminProxy", component: () => import("@/components/home/sudo/proxy/proxy.vue") },
    ]
  },
  {
    path: '/educational',
    component: () => import('@/view/educational.vue')
  },
  {
    path: '/logistics',
    component: () => import('@/view/logistics.vue')
  },
  {
    path: '/library',
    component: () => import('@/view/library.vue')
  },
  {
    path: '/login',
    component: () => import('@/view/login.vue')
  },
  {
    path: '/register',
    component: () => import('@/view/register.vue')
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes

})

export default router