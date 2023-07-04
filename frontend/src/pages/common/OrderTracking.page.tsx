import { useNavigate, useParams } from 'react-router-dom'
import MapLayout from '../../components/Map/MapContainer'
import usePollCourierLocation from '../../api/hooks/order/queries/usePollCourierLocation'
import useGetOrder from '../../api/hooks/order/queries/useGetOrder'
import { useEffect, useState } from 'react'
import { useInterval } from 'usehooks-ts'
import { OrderStatus } from '../../types/order'
import { toast } from 'react-toastify'

const OrderTracking = () => {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const [hasOrder, setHasOrder] = useState(false)
  const { data, isLoading, isError, refetch: refetchOrder } = useGetOrder(Number(orderId))
  const courierId = data?.order?.courier?.id
  const { data: courierLocation, refetch: refetchCourierLocation } =
  // @ts-ignore
    usePollCourierLocation(courierId)

  useEffect(() => {
    if (!isLoading && !isError && courierId) {
      setHasOrder(true)
    }
    if (data?.order.status === OrderStatus.COMPLETED) {
      toast.success('Order delivered!')
      navigate('/home')
    }
  }, [isLoading, isError, courierId, data])

  useInterval(
    () => {
      refetchOrder()
      refetchCourierLocation()
    },
    // Delay in milliseconds or null to stop it
    hasOrder ? 4 * 1000 : null,
  )

  if (isLoading) {
    return <div> loading </div>
  }

  if (isError) {
    return <div> error </div>
  }

  return <MapLayout location={courierLocation?.location} />
}

export default OrderTracking
