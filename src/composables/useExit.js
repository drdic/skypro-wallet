import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { removeSession } from '@/services/session.js'

export const useExit = () => {
  const router = useRouter()
  const isExitModalOpen = ref(false)

  const openExitModal = () => {
    isExitModalOpen.value = true
  }

  const closeExitModal = () => {
    isExitModalOpen.value = false
  }

  const confirmExit = () => {
    closeExitModal()
    removeSession()
    router.push({ name: 'exit' })
  }

  return { isExitModalOpen, openExitModal, closeExitModal, confirmExit }
}
