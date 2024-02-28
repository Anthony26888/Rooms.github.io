// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',        
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: '/Rooms',
        name: 'Rooms',        
        component: () => import(/* webpackChunkName: "home" */ '@/views/Rooms.vue'),
      },
      {
        path: '/Service',
        name: 'Service',        
        component: () => import(/* webpackChunkName: "home" */ '@/views/Service.vue'),
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
