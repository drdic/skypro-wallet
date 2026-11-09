<template>
  <section class="expense-table">
    <h2 class="expense-table__title">Таблица расходов</h2>

    <div class="expense-table__head">
      <span class="expense-table__head-cell">Описание</span>
      <span class="expense-table__head-cell">Категория</span>
      <span class="expense-table__head-cell">Дата</span>
      <span class="expense-table__head-cell">Сумма</span>
      <span class="expense-table__head-cell" />
    </div>

    <div class="expense-table__body">
      <p v-if="isLoading" class="expense-table__empty">Загружаем расходы...</p>

      <template v-else>
        <ExpenseRow
          v-for="expense in expenses"
          :key="expense.id"
          :expense="expense"
          :is-removing="removingId === expense.id"
          @remove="$emit('remove', $event)"
        />
        <p v-if="!expenses.length" class="expense-table__empty">Пока нет расходов</p>
      </template>
    </div>
  </section>
</template>

<script setup>
import ExpenseRow from '@/components/ExpenseRow.vue'

defineProps({
  expenses: {
    type: Array,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  removingId: {
    type: [String, Number],
    default: null,
  },
})

defineEmits(['remove'])
</script>

<style scoped>
.expense-table {
  padding: 32px;
  border-radius: 20px;
  background-color: var(--color-bg-white);
  box-shadow: 0 10px 30px var(--color-shadow-card);
}

.expense-table__title {
  margin-bottom: 20px;
  font-size: 26px;
  font-weight: 700;
  line-height: 32px;
  color: var(--color-text-primary);
}

.expense-table__head {
  display: grid;
  grid-template-columns: 1.3fr 1fr 1fr 1fr 40px;
  gap: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--color-border);
}

.expense-table__head-cell {
  font-size: 14px;
  line-height: 20px;
  color: var(--color-text-secondary);
}

.expense-table__body {
  max-height: 560px;
  overflow-y: auto;
  padding-right: 6px;
}

.expense-table__empty {
  padding: 24px 0;
  font-size: 14px;
  color: var(--color-text-secondary);
}

@media screen and (max-width: 768px) {
  .expense-table {
    padding: 20px 16px;
  }

  .expense-table__head {
    grid-template-columns: 1fr 1fr;
  }

  .expense-table__head-cell:nth-child(3),
  .expense-table__head-cell:nth-child(4) {
    display: none;
  }
}
</style>
