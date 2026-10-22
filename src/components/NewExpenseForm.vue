<template>
  <section class="new-expense">
    <h2 class="new-expense__title">Новый расход</h2>

    <form class="new-expense__form" @submit.prevent="$emit('submit')">
      <div class="new-expense__field">
        <label class="new-expense__label" for="expense-description">Описание</label>
        <BaseInput
          id="expense-description"
          :model-value="description"
          placeholder="Введите описание"
          @update:model-value="$emit('update:description', $event)"
        />
      </div>

      <div class="new-expense__field">
        <span class="new-expense__label">Категория</span>
        <div class="new-expense__categories">
          <button
            v-for="category in categories"
            :key="category.id"
            type="button"
            class="new-expense__category"
            :class="{ 'new-expense__category_active': category.id === selectedCategory }"
            @click="$emit('update:selectedCategory', category.id)"
          >
            <BaseIcon :name="category.icon" :size="16" />
            <span>{{ category.title }}</span>
          </button>
        </div>
      </div>

      <div class="new-expense__field">
        <label class="new-expense__label" for="expense-date">Дата</label>
        <BaseInput
          id="expense-date"
          :model-value="date"
          placeholder="Введите дату"
          @update:model-value="$emit('update:date', $event)"
        />
      </div>

      <div class="new-expense__field">
        <label class="new-expense__label" for="expense-amount">Сумма</label>
        <BaseInput
          id="expense-amount"
          :model-value="amount"
          placeholder="Введите сумму"
          @update:model-value="$emit('update:amount', $event)"
        />
      </div>

      <BaseButton type="submit">Добавить новый расход</BaseButton>
    </form>
  </section>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import BaseInput from '@/components/BaseInput.vue'
import { CATEGORIES } from '@/constants/categories.js'

defineProps({
  description: {
    type: String,
    default: '',
  },
  selectedCategory: {
    type: String,
    default: 'food',
  },
  date: {
    type: String,
    default: '',
  },
  amount: {
    type: [String, Number],
    default: '',
  },
})

defineEmits([
  'submit',
  'update:description',
  'update:selectedCategory',
  'update:date',
  'update:amount',
])

const categories = CATEGORIES
</script>

<style scoped>
.new-expense {
  padding: 32px;
  border-radius: 20px;
  background-color: var(--color-bg-white);
  box-shadow: 0 10px 30px var(--color-shadow-card);
}

.new-expense__title {
  margin-bottom: 24px;
  font-size: 26px;
  font-weight: 700;
  line-height: 32px;
  color: var(--color-text-primary);
}

.new-expense__form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.new-expense__field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.new-expense__label {
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  color: var(--color-text-primary);
}

.new-expense__categories {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.new-expense__category {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 36px;
  padding: 0 14px;
  border: none;
  border-radius: 8px;
  background-color: var(--color-bg);
  color: var(--color-text-primary);
  font-size: 14px;
  line-height: 20px;
  transition:
    background-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
}

.new-expense__category:hover {
  background-color: var(--color-accent-light);
}

.new-expense__category_active {
  background-color: var(--color-accent-light);
  color: var(--color-accent);
}

@media screen and (max-width: 768px) {
  .new-expense {
    padding: 20px 16px;
  }
}
</style>
