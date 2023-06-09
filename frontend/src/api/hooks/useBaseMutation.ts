import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query'

import fetchApi, { FetchParams } from '../fetch-api'
import { ApiError } from '../../types/api'
import { toast } from 'react-toastify'

interface BaseMutationParams<TRes, TErr, TReq> {
  apiParams: FetchParams
  builtInParams?: UseMutationOptions<TRes, TErr, TReq, unknown>
}
function useBaseMutation<TReq, TRes>(
  params: BaseMutationParams<TRes, ApiError, TReq>,
): UseMutationResult<TRes, ApiError, TReq, unknown> {
  const { apiParams, builtInParams } = params
  return useMutation({
    mutationKey: [apiParams.path],
    mutationFn: (body) => fetchApi({ ...apiParams, body }),
    ...builtInParams,
    retry: false,
    onError: (err) => toast.error(err.message),
  })
}

export default useBaseMutation
