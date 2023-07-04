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
  points: 0,
  level: {
    id: 0,
    name: '',
    points: 0,
  },
  coupons: {
    freeDelivery: 0,
    tenPercentOff: 0,
    twentyPercentOff: 0,
    thirtyPercentOff: 0,
    fiftyPercentOff: 0,
  },
  addresses: [],
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
