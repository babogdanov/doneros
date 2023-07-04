import { GetCourierLocationResponse } from '../../../../types/order'
import useBaseQuery from '../../useBaseQuery'

const REFETCH_INTERVAL = 5 * 1000
const usePollCourierLocation = (courierId: number) =>
  useBaseQuery<GetCourierLocationResponse>({
    apiParams: { path: `/order/courier-location/${courierId}` },
    builtInParams: { refetchInterval: REFETCH_INTERVAL, enabled: false, cacheTime: 0 },
  })

export default usePollCourierLocation
