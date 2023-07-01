const Popup = (props) => {
  return (
    <div className='fixed inset-0 bg-black/50'>
      <div className='relative mx-auto mt-[calc(100vh-85vh-20px)] h-auto max-h-[70vh] w-5/6 overflow-auto rounded-md border border-gray-400 bg-white p-20'>
        <span
          className='fixed right-[calc(9%)] top-[calc(100vh-85vh-20px)] flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border border-gray-400 bg-gray-300 text-lg'
          onClick={props.handleClose}
        >
          x
        </span>
        {props.content}
      </div>
    </div>
  )
}

export default Popup
