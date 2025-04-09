import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import DefaultView from '@/layouts/default.vue'
import StudentsView from '@/views/StudentsView.vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const isLoggedIn = () => {
  return localStorage.getItem('isLoggedIn') === 'true'
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/main',
      name: 'Main',
      component: DefaultView,
      beforeEnter: async(to: any, from: any, next: any) => {
        if(!isLoggedIn()) next('/')
        else next()
      },
      children: [
        {
          path: '',
          name: 'Students',
          component: StudentsView
        }
      ]
    },
  ],
})

router.beforeEach((to, from, next) => {
  if(!isLoggedIn() && to.name !== 'Login') next('/')
  else next()
})
router.afterEach(() => {})
export default router
