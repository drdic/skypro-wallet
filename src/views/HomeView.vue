<template>
  <div class="page">
    <BaseHeader @exit="isExitModalOpen = true" />

    <main class="page__content container">
      <h1 class="page__title">Мои расходы</h1>

      <div class="page__grid">
        <div class="page__column">
          <p v-if="loadError" class="page__alert page__alert_error" role="alert">
            {{ loadError }}
            <button type="button" class="page__retry" @click="loadExpenses">Повторить</button>
          </p>

          <ExpenseTable
            :expenses="expenses"
            :is-loading="isLoading"
            :removing-id="removingId"
            @remove="removeExpense"
          />
        </div>

        <NewExpenseForm
          v-model:description="form.description"
          v-model:selected-category="form.category"
          v-model:date="form.date"
          v-model:amount="form.amount"
          :errors="formErrors"
          :disabled="isSubmitting"
          @submit="addExpense"
        />
      </div>
    </main>

    <ExitModal v-if="isExitModalOpen" @close="isExitModalOpen = false" @confirm="confirmExit" />
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseHeader from '@/components/BaseHeader.vue'
import ExitModal from '@/components/ExitModal.vue'
import ExpenseTable from '@/components/ExpenseTable.vue'
import NewExpenseForm from '@/components/NewExpenseForm.vue'
import { fromApiCategory, toApiCategory } from '@/constants/categories.js'
import { removeSession } from '@/services/session.js'
import { createTransaction, deleteTransaction, getTransactions } from '@/services/wallet.js'
import { toISODate } from '@/utils/format.js'
import { hasErrors, validateAmount, validateDate, validateDescription } from '@/utils/validation.js'

const router = useRouter()

const expenses = ref([])
const isLoading = ref(false)
const loadError = ref('')
const isSubmitting = ref(false)
const removingId = ref(null)
const isExitModalOpen = ref(false)

const form = reactive({
  description: '',
  category: 'food',
  date: toISODate(new Date()),
  amount: '',
})

const formErrors = reactive({
  description: '',
  category: '',
  date: '',
  amount: '',
  form: '',
})

const mapTransaction = (transaction) => ({
  id: transaction._id,
  description: transaction.description,
  category: fromApiCategory(transaction.category),
  date: transaction.date,
  amount: transaction.sum,
})

const loadExpenses = async () => {
  isLoading.value = true
  loadError.value = ''

  try {
    const transactions = await getTransactions()
    expenses.value = transactions.map(mapTransaction)
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

const resetForm = () => {
  form.description = ''
  form.category = 'food'
  form.date = toISODate(new Date())
  form.amount = ''
}

const clearFormErrors = () => {
  Object.keys(formErrors).forEach((key) => {
    formErrors[key] = ''
  })
}

const validateForm = () => {
  formErrors.description = validateDescription(form.description)
  formErrors.category = form.category ? '' : 'Выберите категорию'
  formErrors.date = validateDate(form.date)
  formErrors.amount = validateAmount(form.amount)

  return !hasErrors(formErrors)
}

const addExpense = async () => {
  clearFormErrors()

  if (!validateForm()) {
    return
  }

  isSubmitting.value = true

  try {
    const transactions = await createTransaction({
      sum: Number(String(form.amount).replace(',', '.')),
      description: form.description.trim(),
      category: toApiCategory(form.category),
      date: `${form.date}T00:00:00.000Z`,
    })

    expenses.value = transactions.map(mapTransaction)
    resetForm()
  } catch (error) {
    if (error.status === 401) {
      removeSession()
      router.push('/login')
      return
    }

    formErrors.form = error.message
  } finally {
    isSubmitting.value = false
  }
}

const removeExpense = async (id) => {
  if (removingId.value) {
    return
  }

  removingId.value = id
  loadError.value = ''

  try {
    const transactions = await deleteTransaction(id)
    expenses.value = transactions.map(mapTransaction)
  } catch (error) {
    if (error.status === 401) {
      removeSession()
      router.push('/login')
      return
    }

    loadError.value = error.message
  } finally {
    removingId.value = null
  }
}

const confirmExit = () => {
  isExitModalOpen.value = false
  removeSession()
  router.push('/exit')
}

onMounted(loadExpenses)
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

.page__column {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}

.page__alert {
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 20px;
}

.page__alert_error {
  background-color: var(--color-danger-light);
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
