import {
  UpdateCourierLocationRequest,
  UpdateCourierLocationResponse,
} from '../../../../types/order'
import useBaseMutation from '../../useBaseMutation'

const useUpdateCourierLocation = () =>
  useBaseMutation<UpdateCourierLocationRequest, UpdateCourierLocationResponse>({
    apiParams: { path: '/order/courier/update-location', method: 'PUT' },
  })

export default useUpdateCourierLocation
