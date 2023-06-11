import { useEffect } from 'react'

import { clearUser, setUser } from '../utils/local-storage.utils'
import useSyncQuery from '../api/hooks/auth/queries/useSyncQuery'
import { UserRole } from '../types/user'

const initialState = {
  id: 0,
  email: '',
  phoneNumber: '',
  role: UserRole.USER,
}
const useUser = () => {
  const { data: user } = useSyncQuery()

  useEffect(() => {
    if (!user) {
      clearUser()
    } else {
      setUser(user)
    }
  }, [user])

  return user ?? initialState
}

export default useUser
