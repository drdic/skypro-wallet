import { ref } from 'vue'
import { useAuthRedirect } from '@/composables/useAuthRedirect.js'
import { UNAUTHORIZED_STATUS } from '@/services/api.js'
import { getTransactions } from '@/services/wallet.js'

export const useTransactions = () => {
  const { redirectToLogin } = useAuthRedirect()

  const transactions = ref([])
  const isLoading = ref(false)
  const loadError = ref('')

  const load = async () => {
    isLoading.value = true
    loadError.value = ''

    try {
      transactions.value = await getTransactions()
      return true
    } catch (error) {
      if (error.status === UNAUTHORIZED_STATUS) {
        redirectToLogin()
        return false
      }

      loadError.value = error.message
      return false
    } finally {
      isLoading.value = false
    }
  }

  return { transactions, isLoading, loadError, load }
}
