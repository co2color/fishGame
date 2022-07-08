import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/xxl',
      name: 'xxl',
      component: () => import('@/views/xxl/xxl.vue')
    },
    {
      path: '/fishing',
      name: 'fishing',
      component: () => import('@/views/fishing/fishing.vue')
    }
  ]
})

export default router
