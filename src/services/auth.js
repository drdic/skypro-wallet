import axios from 'axios'
import { API_BASE_URL, toApiError } from '@/services/api.js'

const AUTH_URL = `${API_BASE_URL}/user`

const postCredentials = async (url, credentials) => {
  const response = await axios.post(url, credentials, {
    headers: {
      'Content-Type': '',
    },
  })

  return response.data.user
}

export const signIn = async ({ login, password }) => {
  try {
    return await postCredentials(`${AUTH_URL}/login`, { login, password })
  } catch (error) {
    throw toApiError(error, 'Не удалось войти. Проверьте логин и пароль')
  }
}

export const signUp = async ({ name, login, password }) => {
  try {
    return await postCredentials(AUTH_URL, { name, login, password })
  } catch (error) {
    throw toApiError(error, 'Не удалось зарегистрироваться')
  }
}
