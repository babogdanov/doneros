import { SyncResponse } from '../../../../types/user'
import { clearUser, getUser } from '../../../../utils/local-storage.utils'
import useBaseQuery from '../../useBaseQuery'

export const AUTH_QUERY_KEY = ['/auth/sync']

const AUTH_POLLING_TIME = 5 * 60 * 1000 + 1000 // 5 min + 1 s in ms; should be more than back-end JWT TTL time

const useSyncQuery = () =>
  useBaseQuery<SyncResponse>({
    apiParams: { path: '/auth/sync', method: 'GET' },
    builtInParams: {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      initialData: getUser(),
      retry: false,
      staleTime: Infinity,
      refetchInterval: AUTH_POLLING_TIME,
      queryKey: AUTH_QUERY_KEY,
      onError: () => clearUser(),
    },
  })

export default useSyncQuery
