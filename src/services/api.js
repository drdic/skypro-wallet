import { getToken } from '@/services/session.js'

export const API_BASE_URL = 'https://wedev-api.sky.pro/api'

export const UNAUTHORIZED_STATUS = 401

const SERVER_ERROR_STATUS = 500

const getServerMessage = (data) => (typeof data === 'string' ? data : data?.error)

export const getAuthHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
})

export const toApiError = (error, fallbackMessage) => {
  if (error?.isHandled) {
    return error
  }

  if (error?.response) {
    const status = error.response.status

    if (status >= SERVER_ERROR_STATUS) {
      return new Error('Сервер недоступен. Попробуйте позже')
    }

    const apiError = new Error(getServerMessage(error.response.data) || fallbackMessage)
    apiError.status = status
    apiError.isHandled = true

    return apiError
  }

  if (error?.request) {
    return new Error('Нет соединения с сервером. Проверьте подключение к интернету')
  }

  return new Error(fallbackMessage)
}
