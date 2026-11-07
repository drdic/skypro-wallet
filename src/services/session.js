const TOKEN_KEY = 'token'
const USER_KEY = 'user'

export const getToken = () => localStorage.getItem(TOKEN_KEY)

export const isAuthenticated = () => Boolean(getToken())

export const getStoredUser = () => {
  const raw = localStorage.getItem(USER_KEY)

  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export const saveSession = (user) => {
  if (!user?.token) {
    return null
  }

  const profile = { ...user }
  delete profile.token
  delete profile.password

  localStorage.setItem(TOKEN_KEY, user.token)
  localStorage.setItem(USER_KEY, JSON.stringify(profile))

  return profile
}

export const removeSession = () => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}
