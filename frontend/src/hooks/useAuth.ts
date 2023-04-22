import { useQueryClient } from '@tanstack/react-query'
import { AuthState } from '../types/user'

export const LOCAL_AUTH_KEY = ['/auth/sync']
const useAuth = (): AuthState => {
  const baseState = { user: null, accessToken: null, isAuthenticated: false }
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData(LOCAL_AUTH_KEY) as AuthState

  return data ?? baseState
}

export default useAuth
