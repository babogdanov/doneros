import { Address } from '../../types/address'
import useDeleteAddress from '../../api/hooks/address/mutations/useDeleteAddress'

type AddressProps = {
  address: Address
}

const AddressEntry = ({ address }: AddressProps) => {
  const { id, city, street, number, postalCode } = address
  const { mutate: deleteAddress } = useDeleteAddress(`${id}`)

  return (
    <div className=' mb-2 flex'>
      <div className='h-1/6 w-full text-2xl'>{city}, {street}, &#8470; {number}, {postalCode}</div>

      <>
        <button
          className=' ml-4 bg-red-500 text-white hover:bg-red-600 hover:text-white'
          onClick={() => {
            deleteAddress()
          }
        }
        >
          ✘
        </button>
      </>
    </div>
  )
}
export default AddressEntry
