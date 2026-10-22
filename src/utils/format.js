export const formatAmount = (value) => {
  const amount = Number(value) || 0
  return `${amount.toLocaleString('ru-RU')} ₽`
}
