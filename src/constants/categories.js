export const CATEGORIES = [
  { id: 'food', title: 'Еда', icon: 'food', color: 'var(--color-category-food)' },
  { id: 'transport', title: 'Транспорт', icon: 'transport', color: 'var(--color-category-transport)' },
  { id: 'home', title: 'Жилье', icon: 'home', color: 'var(--color-category-home)' },
  {
    id: 'entertainment',
    title: 'Развлечения',
    icon: 'entertainment',
    color: 'var(--color-category-entertainment)',
  },
  { id: 'education', title: 'Образование', icon: 'education', color: 'var(--color-category-education)' },
  { id: 'other', title: 'Другое', icon: 'other', color: 'var(--color-category-other)' },
]

export const getCategoryById = (id) => CATEGORIES.find((category) => category.id === id)
