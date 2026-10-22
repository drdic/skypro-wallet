<template>
  <div class="page">
    <BaseHeader @exit="isExitModalOpen = true" />

    <main class="page__content container">
      <h1 class="page__title">Мои расходы</h1>

      <div class="page__grid">
        <ExpenseTable :expenses="expenses" @remove="removeExpense" />

        <NewExpenseForm
          v-model:description="form.description"
          v-model:selected-category="form.category"
          v-model:date="form.date"
          v-model:amount="form.amount"
          @submit="addExpense"
        />
      </div>
    </main>

    <ExitModal v-if="isExitModalOpen" @close="isExitModalOpen = false" @confirm="confirmExit" />
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseHeader from '@/components/BaseHeader.vue'
import ExitModal from '@/components/ExitModal.vue'
import ExpenseTable from '@/components/ExpenseTable.vue'
import NewExpenseForm from '@/components/NewExpenseForm.vue'
import { DEMO_EXPENSES } from '@/constants/demoExpenses.js'

const router = useRouter()

const expenses = ref([...DEMO_EXPENSES])
const isExitModalOpen = ref(false)
let nextId = expenses.value.length + 1

const form = reactive({
  description: '',
  category: 'food',
  date: '',
  amount: '',
})

const removeExpense = (id) => {
  expenses.value = expenses.value.filter((expense) => expense.id !== id)
}

const addExpense = () => {
  if (!form.description.trim() || !form.date.trim() || !Number(form.amount)) {
    return
  }

  expenses.value.unshift({
    id: nextId++,
    description: form.description.trim(),
    category: form.category,
    date: form.date.trim(),
    amount: Number(form.amount),
  })

  form.description = ''
  form.category = 'food'
  form.date = ''
  form.amount = ''
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
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
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
