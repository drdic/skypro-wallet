import axios from 'axios'

const API_URL = 'https://wedev-api.sky.pro/api/user'

const makeError = (error, fallback) => {
  if (error.response) {
    const status = error.response.status
    if (status >= 500) {
      return new Error('Сервер недоступен. Попробуйте позже')
    }
    return new Error(error.response.data?.error || fallback)
  }

  if (error.request) {
    return new Error('Нет соединения с сервером. Проверьте подключение к интернету')
  }

  return new Error(fallback)
}

export const signIn = async ({ login, password }) => {
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      { login, password },
      {
        headers: {
          'Content-Type': '',
        },
      },
    )

    return response.data.user
  } catch (error) {
    throw makeError(error, 'Не удалось войти. Проверьте логин и пароль')
  }
}

export const signUp = async ({ name, login, password }) => {
  try {
    const response = await axios.post(
      API_URL,
      { name, login, password },
      {
        headers: {
          'Content-Type': '',
        },
      },
    )

    return response.data.user
  } catch (error) {
    throw makeError(error, 'Не удалось зарегистрироваться')
  }
}
