import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

import { AUTH_QUERY_KEY } from '../api/hooks/auth/queries/useSyncQuery'
import { clearUser } from '../utils/local-storage.utils'
import useCartStore from './zustand/useCartStore'

const useLogout = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const resetCart = useCartStore((state) => state.reset)

  const onLogout = useCallback(() => {
    queryClient.setQueryData(AUTH_QUERY_KEY, null)
    clearUser()
    resetCart()
    navigate('/login')
  }, [navigate, queryClient])

  return onLogout
}

export default useLogout
