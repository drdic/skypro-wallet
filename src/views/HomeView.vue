<template>
  <div class="page">
    <BaseHeader @exit="openExitModal" />

    <main class="page__content container">
      <h1 class="page__title">Мои расходы</h1>

      <div class="page__grid">
        <div class="page__column">
          <p v-if="loadError" class="page__alert" role="alert">
            {{ loadError }}
            <button type="button" class="page__retry" @click="load">Повторить</button>
          </p>

          <p v-if="actionError" class="page__alert" role="alert">{{ actionError }}</p>

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

    <ExitModal v-if="isExitModalOpen" @close="closeExitModal" @confirm="confirmExit" />
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import BaseHeader from '@/components/BaseHeader.vue'
import ExitModal from '@/components/ExitModal.vue'
import ExpenseTable from '@/components/ExpenseTable.vue'
import NewExpenseForm from '@/components/NewExpenseForm.vue'
import { useAuthRedirect } from '@/composables/useAuthRedirect.js'
import { useExit } from '@/composables/useExit.js'
import { useTransactions } from '@/composables/useTransactions.js'
import { fromApiCategory, toApiCategory } from '@/constants/categories.js'
import { UNAUTHORIZED_STATUS } from '@/services/api.js'
import { createTransaction, deleteTransaction } from '@/services/wallet.js'
import { toISODate } from '@/utils/format.js'
import { hasErrors, validateAmount, validateDate, validateDescription } from '@/utils/validation.js'

const DEFAULT_CATEGORY = 'food'

const { redirectToLogin } = useAuthRedirect()
const { isExitModalOpen, openExitModal, closeExitModal, confirmExit } = useExit()
const { transactions, isLoading, loadError, load } = useTransactions()

const isSubmitting = ref(false)
const removingId = ref(null)
const actionError = ref('')

const form = reactive({
  description: '',
  category: DEFAULT_CATEGORY,
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

const expenses = computed(() =>
  transactions.value.map((transaction) => ({
    id: transaction._id,
    description: transaction.description,
    category: fromApiCategory(transaction.category),
    date: transaction.date,
    amount: transaction.sum,
  })),
)

const resetForm = () => {
  form.description = ''
  form.category = DEFAULT_CATEGORY
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
  actionError.value = ''

  try {
    await createTransaction({
      sum: Number(String(form.amount).replace(',', '.')),
      description: form.description.trim(),
      category: toApiCategory(form.category),
      date: `${form.date}T00:00:00.000Z`,
    })

    await load()
    resetForm()
  } catch (error) {
    if (error.status === UNAUTHORIZED_STATUS) {
      redirectToLogin()
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
  actionError.value = ''

  try {
    await deleteTransaction(id)
    await load()
  } catch (error) {
    if (error.status === UNAUTHORIZED_STATUS) {
      redirectToLogin()
      return
    }

    actionError.value = error.message
  } finally {
    removingId.value = null
  }
}

onMounted(load)
</script>

