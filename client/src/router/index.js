import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'All Users',
      component: HomeView
    },
    {
      path: '/user-profile/:id',
      name: 'User Profile',
      component: () => import('../views/UserInfoView.vue')
    }
  ]
})

export default router
