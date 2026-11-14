const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const AMOUNT_PATTERN = /^\d+([.,]\d{1,2})?$/
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/

const MIN_LOGIN_LENGTH = 3
const MIN_PASSWORD_LENGTH = 6
const MIN_NAME_LENGTH = 3
const MIN_DESCRIPTION_LENGTH = 4
const MAX_DESCRIPTION_LENGTH = 100
const MAX_AMOUNT = 100000000

const toText = (value) => String(value ?? '').trim()

export const validateLogin = (value) => {
  const login = toText(value)

  if (!login) {
    return 'Введите логин'
  }

  if (/\s/.test(login)) {
    return 'Логин не должен содержать пробелы'
  }

  if (login.length < MIN_LOGIN_LENGTH) {
    return 'Логин должен содержать минимум 3 символа'
  }

  if (login.includes('@') && !EMAIL_PATTERN.test(login)) {
    return 'Введите корректный адрес электронной почты'
  }

  return ''
}

export const validatePassword = (value) => {
  const password = String(value ?? '')

  if (!password) {
    return 'Введите пароль'
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    return 'Пароль должен содержать минимум 6 символов'
  }

  return ''
}

export const validateName = (value) => {
  const name = toText(value)

  if (!name) {
    return 'Введите имя'
  }

  if (name.length < MIN_NAME_LENGTH) {
    return 'Имя должно содержать минимум 3 символа'
  }

  return ''
}

export const validateDescription = (value) => {
  const description = toText(value)

  if (!description) {
    return 'Введите описание'
  }

  if (description.length < MIN_DESCRIPTION_LENGTH) {
    return 'Описание должно содержать минимум 4 символа'
  }

  if (description.length > MAX_DESCRIPTION_LENGTH) {
    return 'Описание не должно превышать 100 символов'
  }

  return ''
}

export const validateAmount = (value) => {
  const raw = toText(value)

  if (!raw) {
    return 'Введите сумму'
  }

  if (!AMOUNT_PATTERN.test(raw)) {
    return 'Сумма должна быть положительным числом'
  }

  const amount = Number(raw.replace(',', '.'))

  if (!Number.isFinite(amount) || amount <= 0) {
    return 'Сумма должна быть больше нуля'
  }

  if (amount > MAX_AMOUNT) {
    return 'Сумма слишком большая'
  }

  return ''
}

export const validateDate = (value) => {
  const raw = toText(value)

  if (!raw) {
    return 'Выберите дату'
  }

  if (!ISO_DATE_PATTERN.test(raw)) {
    return 'Дата должна быть в формате ГГГГ-ММ-ДД'
  }

  const date = new Date(`${raw}T00:00:00`)

  if (Number.isNaN(date.getTime())) {
    return 'Введите корректную дату'
  }

  return ''
}

export const hasErrors = (errors) => Object.values(errors).some(Boolean)
