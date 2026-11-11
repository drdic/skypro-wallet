<template>
  <div class="page">
    <BaseHeader @exit="openExitModal" />

    <main class="page__content container">
      <h1 class="page__title">Анализ расходов</h1>

      <p v-if="loadError" class="page__alert" role="alert">
        {{ loadError }}
        <button type="button" class="page__retry" @click="load">Повторить</button>
      </p>

      <div class="page__grid page__grid_reverse">
        <PeriodCalendar v-model="selectedPeriod" />
        <CategoryChart :amounts="amounts" :caption="caption" :is-loading="isLoading" />
      </div>
    </main>

    <ExitModal v-if="isExitModalOpen" @close="closeExitModal" @confirm="confirmExit" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import BaseHeader from '@/components/BaseHeader.vue'
import CategoryChart from '@/components/CategoryChart.vue'
import ExitModal from '@/components/ExitModal.vue'
import PeriodCalendar from '@/components/PeriodCalendar.vue'
import { useExit } from '@/composables/useExit.js'
import { useTransactions } from '@/composables/useTransactions.js'
import { fromApiCategory } from '@/constants/categories.js'
import { formatDateLong, toISODate } from '@/utils/format.js'

const { isExitModalOpen, openExitModal, closeExitModal, confirmExit } = useExit()
const { transactions, isLoading, loadError, load } = useTransactions()

const selectedPeriod = ref({ start: toISODate(new Date()), end: '' })

const period = computed(() => {
  const start = toISODate(selectedPeriod.value?.start)

  if (!start) {
    return { start: '', end: '' }
  }

  const end = toISODate(selectedPeriod.value?.end) || start

  return start <= end ? { start, end } : { start: end, end: start }
})

const amounts = computed(() => {
  const { start, end } = period.value

  if (!start) {
    return {}
  }

  return transactions.value.reduce((result, transaction) => {
    const date = toISODate(transaction.date)

    if (date < start || date > end) {
      return result
    }

    const category = fromApiCategory(transaction.category)
    result[category] = (result[category] || 0) + Number(transaction.sum || 0)

    return result
  }, {})
})

const caption = computed(() => {
  const { start, end } = period.value

  if (!start) {
    return 'Выберите период'
  }

  if (start === end) {
    return `Расходы за ${formatDateLong(start)}`
  }

  return `Расходы за ${formatDateLong(start)} — ${formatDateLong(end)}`
})

onMounted(load)
</script>

