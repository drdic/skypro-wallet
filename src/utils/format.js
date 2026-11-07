export const formatAmount = (value) => {
  const amount = Number(value) || 0
  return `${amount.toLocaleString('ru-RU')} ₽`
}

export const toISODate = (value) => {
  if (typeof value === 'string') {
    const isoMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})/)
    if (isoMatch) {
      return `${isoMatch[1]}-${isoMatch[2]}-${isoMatch[3]}`
    }
  }

  const date = parseDate(value)

  if (!date) {
    return ''
  }

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const parseDate = (value) => {
  if (!value) {
    return null
  }

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value
  }

  const isoDateOnly = String(value).match(/^(\d{4})-(\d{2})-(\d{2})$/)
  const date = isoDateOnly
    ? new Date(Number(isoDateOnly[1]), Number(isoDateOnly[2]) - 1, Number(isoDateOnly[3]))
    : new Date(value)

  return Number.isNaN(date.getTime()) ? null : date
}

export const formatDate = (value) => {
  const date = parseDate(value)

  if (!date) {
    return String(value ?? '')
  }

  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export const formatMonthTitle = (date) => {
  const month = date.toLocaleDateString('ru-RU', { month: 'long' })

  return `${month.charAt(0).toUpperCase()}${month.slice(1)} ${date.getFullYear()}`
}
