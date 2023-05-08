import { useEffect } from 'react'

import useSyncQuery from '../api/hooks/queries/auth/useSyncQuery'
import { clearUser, setUser } from '../utils/local-storage.utils'

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
