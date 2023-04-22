import storage from 'store2'

const JWT_TOKEN_KEY = import.meta.env.VITE_JWT_TOKEN_KEY

export function getJWT() {
  return storage.session.get(JWT_TOKEN_KEY)
}

export function setJWT(token: string) {
  return storage.session.set(JWT_TOKEN_KEY, token)
}

export function clearJWT() {
  return storage.session.remove(JWT_TOKEN_KEY)
}

export function hasJWT() {
  return !!storage.session.get(JWT_TOKEN_KEY)
}
