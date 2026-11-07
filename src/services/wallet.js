import axios from 'axios'

const API_URL = 'https://wedev-api.sky.pro/api/transactions'

const getToken = () => localStorage.getItem('token')

const getHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
})

const makeError = (error, fallback) => {
  if (error?.isHandled) {
    return error
  }

  if (error?.response) {
    const status = error.response.status
    if (status >= 500) {
      return new Error('Сервер недоступен. Попробуйте позже')
    }

    const message =
      typeof error.response.data === 'string'
        ? error.response.data
        : error.response.data?.error || fallback
    const result = new Error(message)
    result.status = status
    result.isHandled = true

    return result
  }

  if (error?.request) {
    return new Error('Нет соединения с сервером. Проверьте подключение к интернету')
  }

  return new Error(fallback)
}

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
    const response = await axios.get(API_URL, {
      headers: getHeaders(),
    })

    return extractTransactions(response.data, 401)
  } catch (error) {
    throw makeError(error, 'Не удалось загрузить расходы')
  }
}

export const createTransaction = async (data) => {
  try {
    const response = await axios.post(API_URL, data, {
      headers: {
        ...getHeaders(),
        'Content-Type': '',
      },
    })

    return extractTransactions(response.data, response.status)
  } catch (error) {
    throw makeError(error, 'Не удалось добавить расход')
  }
}

export const deleteTransaction = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: getHeaders(),
    })

    return extractTransactions(response.data, response.status)
  } catch (error) {
    throw makeError(error, 'Не удалось удалить расход')
  }
}
