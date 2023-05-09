import { useParams } from 'react-router-dom'

const Restaurant = () => {
  const searchParams = useParams()
  console.log(searchParams)
  return <div>{JSON.stringify(searchParams)}</div>
}

export default Restaurant
