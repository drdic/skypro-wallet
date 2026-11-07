export const CATEGORIES = [
  {
    id: 'food',
    apiId: 'food',
    title: 'Еда',
    icon: 'food',
    color: 'var(--color-category-food)',
  },
  {
    id: 'transport',
    apiId: 'transport',
    title: 'Транспорт',
    icon: 'transport',
    color: 'var(--color-category-transport)',
  },
  {
    id: 'home',
    apiId: 'housing',
    title: 'Жилье',
    icon: 'home',
    color: 'var(--color-category-home)',
  },
  {
    id: 'entertainment',
    apiId: 'joy',
    title: 'Развлечения',
    icon: 'entertainment',
    color: 'var(--color-category-entertainment)',
  },
  {
    id: 'education',
    apiId: 'education',
    title: 'Образование',
    icon: 'education',
    color: 'var(--color-category-education)',
  },
  {
    id: 'other',
    apiId: 'others',
    title: 'Другое',
    icon: 'other',
    color: 'var(--color-category-other)',
  },
]

export const getCategoryById = (id) => CATEGORIES.find((category) => category.id === id)

export const getCategoryByApiId = (apiId) => CATEGORIES.find((category) => category.apiId === apiId)

export const toApiCategory = (id) => getCategoryById(id)?.apiId ?? id

export const fromApiCategory = (apiId) => getCategoryByApiId(apiId)?.id ?? apiId
