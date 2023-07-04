import { useParams } from 'react-router-dom'
import MapLayout from '../../components/Map/MapContainer'
import usePollCourierLocation from '../../api/hooks/order/queries/usePollCourierLocation'
import useGetOrder from '../../api/hooks/order/queries/useGetOrder'
import { useEffect, useState } from 'react'
import { useInterval } from 'usehooks-ts'

const OrderTracking = () => {
  const { orderId } = useParams()

  const [hasOrder, setHasOrder] = useState(false)
  const { data, isLoading, isError } = useGetOrder(Number(orderId))
  const courierId = data?.order?.courier?.id
  // @ts-ignore
  const { data: courierLocation, refetch } = usePollCourierLocation(courierId)

  console.log(courierLocation?.location)
  useEffect(() => {
    if (!isLoading && !isError && courierId) {
      setHasOrder(true)
    }
  }, [isLoading, isError, courierId])

  useInterval(
    () => {
      refetch()
      console.log('refetch')
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
