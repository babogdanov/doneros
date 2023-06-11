import { useState } from 'react'
import { toast } from 'react-toastify'

import useLoginMutation from '../api/hooks/auth/mutations/useLoginMutation'
import useValidation from '../hooks/useValidation'
import { trimObjectStrings } from '../utils/string.utils'
import { ERROR } from '../utils/error-message.constants'

const Login = () => {
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
        className='flex h-full w-full items-center justify-center'
        onSubmit={handleSubmit}
      >
        <div className='w-full max-w-xl rounded-2xl bg-transparent p-8'>
          <div className='text-center'>
            <h1 className='text-5xl font-bold text-yellow-500'>Login</h1>
          </div>
          <div className='mt-8'>
            <input
              type='email'
              name='email'
              placeholder='Email'
              className='block w-full rounded-lg bg-gray-800 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500'
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
              className='w-full rounded-lg bg-yellow-500 px-4 py-3 font-bold text-gray-900 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500'
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
              className='flex w-full items-center justify-center rounded-lg bg-yellow-500 px-4  py-3 text-2xl font-bold text-slate-300 hover:text-3xl hover:text-slate-50 focus:outline-none focus:ring-2 focus:ring-yellow-500'
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default Login
