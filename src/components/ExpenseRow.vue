<template>
  <div class="expense-row">
    <span class="expense-row__cell expense-row__description">{{ expense.description }}</span>
    <span class="expense-row__cell expense-row__category">{{ category?.title }}</span>
    <span class="expense-row__cell expense-row__date">{{ formatDate(expense.date) }}</span>
    <span class="expense-row__cell expense-row__amount">{{ formatAmount(expense.amount) }}</span>
    <button
      type="button"
      class="expense-row__delete _hover02"
      :disabled="isRemoving"
      :aria-label="`Удалить расход ${expense.description}`"
      @click="$emit('remove', expense.id)"
    >
      <BaseIcon name="trash" :size="18" />
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import BaseIcon from '@/components/BaseIcon.vue'
import { getCategoryById } from '@/constants/categories.js'
import { formatAmount, formatDate } from '@/utils/format.js'

const props = defineProps({
  expense: {
    type: Object,
    required: true,
  },
  isRemoving: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['remove'])

const category = computed(() => getCategoryById(props.expense.category))
</script>

<style scoped>
.expense-row {
  display: grid;
  grid-template-columns: 1.3fr 1fr 1fr 1fr 40px;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--color-border-light);
  font-size: 14px;
  line-height: 20px;
  color: var(--color-text-primary);
}

.expense-row__delete {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--color-text-secondary);
}

.expense-row__delete:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.expense-row__cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media screen and (max-width: 768px) {
  .expense-row {
    grid-template-columns: 1fr auto auto;
    grid-template-areas:
      'description description delete'
      'category date amount';
    align-items: center;
    row-gap: 2px;
    padding: 10px 0;
  }

  .expense-row__description {
    grid-area: description;
    font-weight: 600;
  }

  .expense-row__category {
    grid-area: category;
    font-size: 13px;
    line-height: 18px;
    color: var(--color-text-secondary);
  }

  .expense-row__date {
    grid-area: date;
    font-size: 13px;
    line-height: 18px;
    color: var(--color-text-secondary);
  }

  .expense-row__amount {
    grid-area: amount;
    font-size: 14px;
    font-weight: 600;
    text-align: right;
  }

  .expense-row__delete {
    grid-area: delete;
    justify-self: end;
  }
}
</style>
