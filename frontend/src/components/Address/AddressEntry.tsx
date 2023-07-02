import { useNavigate } from 'react-router-dom'

import { Address } from '../../types/user'
// import useDeleteAddress from '../../api/hooks/address/useDeleteAddress'
import { toast } from 'react-toastify'

type AddressProps = {
  address: Address
}

const AddressEntry = ({ address }: AddressProps) => {
  const navigate = useNavigate()
  const { id, city, street, number, postalCode } = address
  // const { mutate: deleteAddress } = useDeleteAddress(`${id}`)

  return (
    <div className=' mb-2'>
      <div className='h-1/6 w-full text-2xl'>{city}, {street}, &#8470; {number}, {postalCode}</div>

      {/* <>
        <button
          className='w-1/2 bg-red-500 text-white hover:bg-red-600 hover:text-white'
          onClick={() => deleteAddress()}
        >
          Delete
        </button>
      </> */}
    </div>
  )
}
export default AddressEntry
