import { Link } from 'react-router-dom'

const MenuItem = () => (
  <div className="bg-white shadow-lg rounded-lg w-80 h-96 font-sans text-center">
    <div className='w-full h-12 text-2xl'>Име на продукта</div>
    <div className='w-full h-48'>Снимка</div>
    <div className='w-full h-24 text-base'>Продукта е произведен с много лобов от белев и неговата солка. Качество - топ.</div>
    <button className='w-full h-12 mb-0 bg-lime-500 hover:bg-lime-400 text-white font-semibold hover:text-white'>
            Изберете
    </button>
  </div>
)

export default MenuItem
