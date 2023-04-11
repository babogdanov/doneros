import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import useLoginMutation from '../api/hooks/mutations/auth/useLoginMutation'
import useValidation from '../hooks/useValidation'
import { trimObjectStrings } from '../utils/string.utils'
import { ERROR } from '../utils/error-message.constants'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  })

  const { mutate: login, error, isError, isSuccess } = useLoginMutation()

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

  useEffect(() => {
    if (isError) {
      const errorMessage = error?.response?.data?.message
      toast.error(errorMessage)
    }
    if (isSuccess) {
      toast.success('You have logged in successfully')
    }
  }, [error, isError, isSuccess])

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/restaurants')
    }
  }, [isAuthenticated])

  return (
    <>
      <form
        className='flex flex-col gap-2 justify-center items-center'
        onSubmit={handleSubmit}
      >
        <label>
          Email:
          <input
            type='email'
            name='email'
            value={formState.email}
            onChange={(event) =>
              setFormState((prevState) => ({
                ...prevState,
                email: event.target.value,
              }))
            }
          />
        </label>
        <label>
          Password:
          <input
            type='password'
            name='password'
            value={formState.password}
            onChange={(event) =>
              setFormState((prevState) => ({
                ...prevState,
                password: event.target.value,
              }))
            }
          />
        </label>

        <button type='submit' className='w-min'>
          Login
        </button>
      </form>
    </>
  )
}

export default LoginPage
