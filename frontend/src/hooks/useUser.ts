import { useEffect } from 'react'

import { clearUser, setUser } from '../utils/local-storage.utils'
import useSyncQuery from '../api/hooks/auth/queries/useSyncQuery'

const useUser = () => {
  const { data: user } = useSyncQuery()

  useEffect(() => {
    if (!user) {
      clearUser()
    } else {
      setUser(user)
    }
  }, [user])

  return user ?? null
}

export default useUser
