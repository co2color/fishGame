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
      path: '/anipop',
      name: 'anipop',
      component: () => import('@/views/anipop/anipop.vue')
    },
    {
      path: '/fishing',
      name: 'fishing',
      component: () => import('@/views/fishing/fishing.vue')
    },
    {
      path: '/snake',
      name: 'snake',
      component: () => import('@/views/snake/snake.vue')
    },
    {
      path: '/2048',
      name: '2048',
      component: () => import('@/views/2048/2048.vue')
    },
    {
      path: '/tictactoe',
      name: 'tictactoe',
      component: () => import('@/views/tictactoe/Tictactoe.vue')
    }
  ]
})
router.beforeEach(to => {
  document.title = String(to.name)
})

export default router
