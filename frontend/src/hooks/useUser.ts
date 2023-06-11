import { useEffect } from 'react'

import { clearUser, setUser } from '../utils/local-storage.utils'
import useSyncQuery from '../api/hooks/auth/queries/useSyncQuery'
import { User, UserRole } from '../types/user'

const initialState: User = {
  id: 0,
  email: '',
  phoneNumber: '',
  role: UserRole.USER,
  accessToken: null,
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
