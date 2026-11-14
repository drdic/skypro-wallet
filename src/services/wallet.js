import axios from 'axios'
import { API_BASE_URL, getAuthHeaders, toApiError } from '@/services/api.js'

const TRANSACTIONS_URL = `${API_BASE_URL}/transactions`
const PERIOD_URL = `${TRANSACTIONS_URL}/period`
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/

const isISODate = (value) => typeof value === 'string' && ISO_DATE_PATTERN.test(value)

const extractTransactions = (data, status) => {
  if (data && !Array.isArray(data) && typeof data === 'object' && data.error) {
    const error = new Error(data.error)
    error.status = status
    error.isHandled = true

    throw error
  }

  if (Array.isArray(data)) {
    return data
  }

  return data?.transactions ?? []
}

export const getTransactions = async () => {
  try {
    const response = await axios.get(TRANSACTIONS_URL, { headers: getAuthHeaders() })

    return extractTransactions(response.data, response.status)
  } catch (error) {
    throw toApiError(error, 'Не удалось загрузить расходы')
  }
}

export const getTransactionsByPeriod = async ({ start, end } = {}) => {
  if (!isISODate(start) || !isISODate(end)) {
    const error = new Error('Укажите корректный период')

    error.status = 400
    error.isHandled = true

    throw error
  }

  try {
    const response = await axios.post(
      PERIOD_URL,
      { start, end },
      {
        headers: {
          ...getAuthHeaders(),
          'Content-Type': '',
        },
      },
    )

    return extractTransactions(response.data, response.status)
  } catch (error) {
    throw toApiError(error, 'Не удалось загрузить расходы за период')
  }
}

export const createTransaction = async (transaction) => {
  try {
    const response = await axios.post(TRANSACTIONS_URL, transaction, {
      headers: {
        ...getAuthHeaders(),
        'Content-Type': '',
      },
    })

    return extractTransactions(response.data, response.status)
  } catch (error) {
    throw toApiError(error, 'Не удалось добавить расход')
  }
}

export const deleteTransaction = async (id) => {
  try {
    const response = await axios.delete(`${TRANSACTIONS_URL}/${id}`, { headers: getAuthHeaders() })

    return extractTransactions(response.data, response.status)
  } catch (error) {
    throw toApiError(error, 'Не удалось удалить расход')
  }
}
