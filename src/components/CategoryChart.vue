<template>
  <section class="chart">
    <h2 class="chart__total">{{ formatAmount(total) }}</h2>
    <p class="chart__caption">{{ caption }}</p>

    <div class="chart__bars">
      <div v-for="item in items" :key="item.id" class="chart__item">
        <span class="chart__value">{{ formatAmount(item.amount) }}</span>
        <div class="chart__bar-wrapper">
          <div
            class="chart__bar"
            :style="{ height: `${getHeight(item.amount)}px`, backgroundColor: item.color }"
          />
        </div>
        <span class="chart__label">{{ item.title }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { CATEGORIES } from '@/constants/categories.js'
import { formatAmount } from '@/utils/format.js'

const props = defineProps({
  amounts: {
    type: Object,
    default: () => ({}),
  },
  caption: {
    type: String,
    default: 'Расходы за 10 июля 2024',
  },
})

const items = computed(() =>
  CATEGORIES.map((category) => ({
    ...category,
    amount: props.amounts[category.id] || 0,
  })),
)

const total = computed(() => items.value.reduce((sum, item) => sum + item.amount, 0))

const maxAmount = computed(() => Math.max(...items.value.map((item) => item.amount), 1))

const getHeight = (amount) => (amount ? Math.max((amount / maxAmount.value) * 300, 4) : 4)
</script>

<style scoped>
.chart {
  padding: 32px;
  border-radius: 20px;
  background-color: var(--color-bg-white);
  box-shadow: 0 10px 30px var(--color-shadow-card);
}

.chart__total {
  font-size: 28px;
  font-weight: 700;
  line-height: 34px;
  color: var(--color-text-primary);
}

.chart__caption {
  margin: 6px 0 28px;
  font-size: 14px;
  line-height: 20px;
  color: var(--color-text-secondary);
}

.chart__bars {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  min-height: 380px;
}

.chart__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  flex: 1;
}

.chart__value {
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  color: var(--color-text-primary);
  white-space: nowrap;
}

.chart__bar-wrapper {
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 300px;
}

.chart__bar {
  width: 100%;
  border-radius: 8px;
  transition: height 0.3s ease-in-out;
}

.chart__label {
  font-size: 12px;
  line-height: 16px;
  color: var(--color-text-secondary);
  text-align: center;
}

@media screen and (max-width: 768px) {
  .chart {
    padding: 20px 16px;
  }

  .chart__bars {
    gap: 8px;
  }

  .chart__label {
    font-size: 10px;
  }
}
</style>
