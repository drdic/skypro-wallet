import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layout/AppLayout.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import AnalysisView from '@/views/AnalysisView.vue'
import ExitView from '@/views/ExitView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import { isAuthenticated } from '@/services/session.js'

const redirectQuery = window.location.search
if (redirectQuery.startsWith('?/')) {
  const restoredPath = redirectQuery.slice(2).replace(/~/g, '/').replace(/~and~/g, '&')
  window.history.replaceState(null, '', import.meta.env.BASE_URL + restoredPath)
}

const routes = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView,
        meta: { requiresAuth: true },
      },
      {
        path: 'analysis',
        name: 'analysis',
        component: AnalysisView,
        meta: { requiresAuth: true },
      },
      {
        path: 'exit',
        name: 'exit',
        component: ExitView,
      },
      {
        path: 'login',
        name: 'login',
        component: LoginView,
        meta: { guestOnly: true },
      },
      {
        path: 'register',
        name: 'register',
        component: RegisterView,
        meta: { guestOnly: true },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to) => {
  const authenticated = isAuthenticated()

  if (to.meta.requiresAuth && !authenticated) {
    return { name: 'login' }
  }

  if (to.meta.guestOnly && authenticated) {
    return { name: 'home' }
  }

  return true
})

export default router
