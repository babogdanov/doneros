import { User } from '../types/user'

const USER_LOCAL_STORAGE_KEY = import.meta.env.VITE_USER_KEY

export function getUser(): User {
  const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY)
  return user ? JSON.parse(user) : undefined
}

export function setUser(user: User) {
  return localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user))
}

export function clearUser() {
  return localStorage.removeItem(USER_LOCAL_STORAGE_KEY)
}
