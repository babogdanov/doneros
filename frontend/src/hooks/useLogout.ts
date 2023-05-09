import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

import { AUTH_QUERY_KEY } from '../api/hooks/auth/queries/useSyncQuery'
import { clearUser } from '../utils/local-storage.utils'

const useLogout = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const onLogout = useCallback(() => {
    queryClient.setQueryData(AUTH_QUERY_KEY, null)
    clearUser()
    navigate('/login')
  }, [navigate, queryClient])

  return onLogout
}

export default useLogout
