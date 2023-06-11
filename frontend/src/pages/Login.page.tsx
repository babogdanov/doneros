import { useState } from 'react'
import { toast } from 'react-toastify'

import useLoginMutation from '../api/hooks/auth/mutations/useLoginMutation'
import useValidation from '../hooks/useValidation'
import { trimObjectStrings } from '../utils/string.utils'
import { ERROR } from '../utils/error-message.constants'

const LoginPage = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  })

  const { mutate: login } = useLoginMutation()

  const [isValid, errorMessage] = useValidation([
    {
      input: formState.email,
      validationFunc: (input) => input.length > 0,
      errorMessage: ERROR.login.emailRequired,
    },
    {
      input: formState.password,
      validationFunc: (input) => input.length >= 6,
      errorMessage: ERROR.login.passwordRequired,
    },
  ])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // Prevent the browser from reloading the page
    e.preventDefault()
    if (!isValid) {
      toast.error(errorMessage)
      return
    }

    const trimmedForm = trimObjectStrings(formState)

    login({ email: trimmedForm.email, password: trimmedForm.password })
  }

  return (
    <>
      <form
        className='w-full h-full flex items-center justify-center'
        onSubmit={handleSubmit}
      >
        <div className='w-full max-w-xl bg-transparentrounded-2xl p-8'>
          <div className='text-center'>
            <h1 className='text-yellow-500 font-bold text-5xl'>Login</h1>
          </div>
          <div className='mt-8'>
            <input
              type='email'
              name='email'
              placeholder='Email'
              className='block w-full bg-gray-800 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent'
              value={formState.email}
              onChange={(event) =>
                setFormState((prevState) => ({
                  ...prevState,
                  email: event.target.value,
                }))
              }
            />

            <input
              type='password'
              name='password'
              placeholder='Password'
              className='w-full py-3 px-4 bg-yellow-500 text-gray-900 rounded-lg font-bold hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50'
              value={formState.password}
              onChange={(event) =>
                setFormState((prevState) => ({
                  ...prevState,
                  password: event.target.value,
                }))
              }
            />

            <button
              type='submit'
              className='w-full flex justify-center items-center text-2x1 py-3 px-4  rounded-lg font-bold  focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 text-slate-300 hover:text-slate-50 text-2xl hover:text-3xl bg-yellow-500 '
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default LoginPage
