import { UseQueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query'
import fetchApi, { FetchParams } from '../fetch-api'
import { ApiError } from '../../types/api'

interface BaseQueryParams<TRes, TErr> {
  apiParams: Omit<FetchParams, 'body'>
  builtInParams?: UseQueryOptions<unknown, TErr, TRes>
}

function useBaseQuery<TRes>(
  params: BaseQueryParams<TRes, ApiError>,
): UseQueryResult<TRes, ApiError> {
  const { apiParams, builtInParams } = params
  return useQuery({
    queryKey: [apiParams.path],
    queryFn: () => fetchApi(apiParams),
    ...builtInParams,
  })
}

export default useBaseQuery
