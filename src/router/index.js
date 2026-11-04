import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layout/AppLayout.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import AnalysisView from '@/views/AnalysisView.vue'
import ExitView from '@/views/ExitView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

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
      },
      {
        path: 'analysis',
        name: 'analysis',
        component: AnalysisView,
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
      },
      {
        path: 'register',
        name: 'register',
        component: RegisterView,
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

export default router
