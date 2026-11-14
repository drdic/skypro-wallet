import { useRouter } from 'vue-router'
import { removeSession } from '@/services/session.js'

export const useAuthRedirect = () => {
  const router = useRouter()

  const redirectToLogin = () => {
    removeSession()
    router.push({ name: 'login' })
  }

  return { redirectToLogin }
}
