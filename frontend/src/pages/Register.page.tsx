import { useState } from 'react'
import { toast } from 'react-toastify'

import useRegisterMutation from '../api/hooks/auth/mutations/useRegisterMutation'
import useValidation from '../hooks/useValidation'
import { trimObjectStrings } from '../utils/string.utils'
import { ERROR } from '../utils/error-message.constants'

const Register = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
  })

  const { mutate: register } = useRegisterMutation()

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
    {
      input: [formState.password, formState.confirmPassword],
      validationFunc: ([passwordOne, passwordTwo]) => passwordOne === passwordTwo,
      errorMessage: ERROR.register.confirmPassword,
    },
    {
      input: formState.phoneNumber,
      validationFunc: (input) => {
        return typeof input === 'string' ? input.match(/\d/g)?.length === 10 : false
      },
      errorMessage: ERROR.register.phoneNumberRequired,
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...rest } = trimmedForm
    register(rest)
  }

  return (
    <>
      <form
        className='flex h-full w-full flex-col items-center justify-center'
        onSubmit={handleSubmit}
      >
        <div className='w-full max-w-xl rounded-2xl bg-transparent p-8'>
          <div className='text-center'>
            <h1 className='text-5xl font-bold text-yellow-500'>Register</h1>
          </div>
        </div>
        <div className='mt-8'>
          <input
            type='email'
            name='email'
            placeholder='Email'
            className='w-full rounded-lg focus:ring-2 focus:ring-yellow-500'
            value={formState.email}
            onChange={(event) =>
              setFormState((prevState) => ({
                ...prevState,
                email: event.target.value,
              }))
            }
          />

          <input
            type='text'
            name='phone'
            placeholder='Phone number'
            className='w-full rounded-lg focus:ring-2 focus:ring-yellow-500'
            value={formState.phoneNumber}
            onChange={(event) =>
              setFormState((prevState) => ({
                ...prevState,
                phoneNumber: event.target.value,
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
          <input
            type='password'
            name='password'
            placeholder='Password'
            className='w-full rounded-lg bg-yellow-500 px-4 py-3 font-bold text-gray-900 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500'
            value={formState.confirmPassword}
            onChange={(event) =>
              setFormState((prevState) => ({
                ...prevState,
                confirmPassword: event.target.value,
              }))
            }
          />
          <button
            type='submit'
            className='flex w-full items-center justify-center rounded-lg bg-yellow-500 px-4 py-3 text-2xl text-slate-300 hover:text-3xl hover:text-slate-50 focus:outline-none focus:ring-2 focus:ring-yellow-500'
          >
            Register
          </button>
        </div>
      </form>
    </>
  )
}

export default Register
