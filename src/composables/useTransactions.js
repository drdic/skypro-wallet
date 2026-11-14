import { ref } from 'vue'
import { useAuthRedirect } from '@/composables/useAuthRedirect.js'
import { UNAUTHORIZED_STATUS } from '@/services/api.js'
import { getTransactions } from '@/services/wallet.js'

export const useTransactions = (loader = getTransactions) => {
  const { redirectToLogin } = useAuthRedirect()

  const transactions = ref([])
  const isLoading = ref(false)
  const loadError = ref('')

  let lastRequestId = 0

  const load = async (...args) => {
    const requestId = ++lastRequestId

    isLoading.value = true
    loadError.value = ''

    try {
      const result = await loader(...args)

      if (requestId !== lastRequestId) {
        return false
      }

      transactions.value = result
      return true
    } catch (error) {
      if (requestId !== lastRequestId) {
        return false
      }

      if (error.status === UNAUTHORIZED_STATUS) {
        redirectToLogin()
        return false
      }

      loadError.value = error.message
      return false
    } finally {
      if (requestId === lastRequestId) {
        isLoading.value = false
      }
    }
  }

  return { transactions, isLoading, loadError, load }
}
