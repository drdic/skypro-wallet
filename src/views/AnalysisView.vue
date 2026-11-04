<template>
  <div class="page">
    <BaseHeader @exit="isExitModalOpen = true" />

    <main class="page__content container">
      <h1 class="page__title">Анализ расходов</h1>

      <div class="page__grid">
        <PeriodCalendar selected-month="Июль 2024" :selected-day="10" />
        <CategoryChart :amounts="amounts" caption="Расходы за 10 июля 2024" />
      </div>
    </main>

    <ExitModal v-if="isExitModalOpen" @close="isExitModalOpen = false" @confirm="confirmExit" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseHeader from '@/components/BaseHeader.vue'
import CategoryChart from '@/components/CategoryChart.vue'
import ExitModal from '@/components/ExitModal.vue'
import PeriodCalendar from '@/components/PeriodCalendar.vue'

const router = useRouter()
const isExitModalOpen = ref(false)

const amounts = {
  food: 3590,
  transport: 1835,
  home: 0,
  entertainment: 1250,
  education: 600,
  other: 2306,
}

const confirmExit = () => {
  isExitModalOpen.value = false
  router.push('/login')
}
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
