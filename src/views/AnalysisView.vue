<template>
  <div class="page">
    <BaseHeader @exit="isExitModalOpen = true" />

    <main class="page__content container">
      <h1 class="page__title">Анализ расходов</h1>

      <p v-if="loadError" class="page__alert" role="alert">
        {{ loadError }}
        <button type="button" class="page__retry" @click="loadTransactions">Повторить</button>
      </p>

      <div class="page__grid">
        <PeriodCalendar v-model="selectedDate" />
        <CategoryChart :amounts="amounts" :caption="caption" :is-loading="isLoading" />
      </div>
    </main>

    <ExitModal v-if="isExitModalOpen" @close="isExitModalOpen = false" @confirm="confirmExit" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseHeader from '@/components/BaseHeader.vue'
import CategoryChart from '@/components/CategoryChart.vue'
import ExitModal from '@/components/ExitModal.vue'
import PeriodCalendar from '@/components/PeriodCalendar.vue'
import { removeSession } from '@/services/session.js'
import { getTransactions } from '@/services/wallet.js'
import { formatDate, parseDate, toISODate } from '@/utils/format.js'

const router = useRouter()

const transactions = ref([])
const selectedDate = ref(toISODate(new Date()))
const isLoading = ref(false)
const loadError = ref('')
const isExitModalOpen = ref(false)

const amounts = computed(() => {
  const result = {}
  const target = selectedDate.value

  transactions.value.forEach((transaction) => {
    if (toISODate(transaction.date) !== target) {
      return
    }

    result[transaction.category] = (result[transaction.category] || 0) + Number(transaction.sum || 0)
  })

  return result
})

const caption = computed(() => {
  const date = parseDate(selectedDate.value)

  return date ? `Расходы за ${formatDate(date)}` : 'Выберите дату'
})

const loadTransactions = async () => {
  isLoading.value = true
  loadError.value = ''

  try {
    transactions.value = await getTransactions()
  } catch (error) {
    if (error.status === 401) {
      removeSession()
      router.push('/login')
      return
    }

    loadError.value = error.message
  } finally {
    isLoading.value = false
  }
}

const confirmExit = () => {
  isExitModalOpen.value = false
  removeSession()
  router.push('/exit')
}

onMounted(loadTransactions)
</script>

<style scoped>
.page {
  min-height: 100vh;
  background-color: var(--color-bg);
}

.page__content {
  padding-top: 40px;
  padding-bottom: 60px;
}

.page__title {
  margin-bottom: 24px;
  font-size: 40px;
  font-weight: 700;
  line-height: 48px;
  color: var(--color-text-primary);
}

.page__alert {
  margin-bottom: 16px;
  padding: 12px 16px;
  border-radius: 12px;
  background-color: var(--color-danger-light);
  font-size: 14px;
  line-height: 20px;
  color: var(--color-danger);
}

.page__retry {
  margin-left: 8px;
  border: none;
  background: transparent;
  font-size: 14px;
  color: var(--color-danger);
  text-decoration: underline;
}

.page__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
  gap: 24px;
  align-items: start;
}

@media screen and (max-width: 1000px) {
  .page__grid {
    grid-template-columns: 1fr;
  }
}

@media screen and (max-width: 768px) {
  .page__title {
    font-size: 28px;
    line-height: 34px;
  }
}
</style>
