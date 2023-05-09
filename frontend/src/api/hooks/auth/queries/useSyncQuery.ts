import useBaseQuery from '../../useBaseQuery'
import { LoginResponse } from '../../../../types/user'

const AUTH_POLLING_TIME = 5 * 60 * 1000 + 1000 // 5 min + 1 s in ms; should be more than back-end JWT TTL time

// TODO: refactor this and useAuthQuery
const useSyncQuery = () => {
  return useBaseQuery<LoginResponse>({
    apiParams: { path: '/auth/sync', method: 'GET' },
    builtInParams: {
      retry: 0,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retryOnMount: false,
      refetchInterval: AUTH_POLLING_TIME,
    },
  })
}

export default useSyncQuery
