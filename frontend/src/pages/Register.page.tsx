import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import useRegisterMutation from '../api/hooks/mutations/auth/useRegisterMutation'
import useValidation from '../hooks/useValidation'
import { trimObjectStrings } from '../utils/string.utils'
import { ERROR } from '../utils/error-message.constants'

const RegisterPage = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const { mutate: register, error, isError, isSuccess } = useRegisterMutation()

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
  ])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // Prevent the browser from reloading the page
    e.preventDefault()
    if (!isValid) {
      toast.error(errorMessage)
      return
    }

    const trimmedForm = trimObjectStrings(formState)

    register({ email: trimmedForm.email, password: trimmedForm.password })
  }

  useEffect(() => {
    if (isError) {
      // TODO: Extract me in a separate file in types/, check if there is a better type for statusCode
      const errorMessage = error?.response?.data?.message
      toast.error(errorMessage)
    }
    if (isSuccess) {
      toast.success('You have registered successfully')
    }
  }, [error, isError, isSuccess])

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

        <label>
          Confirm password:
          <input
            type='password'
            name='password'
            value={formState.confirmPassword}
            onChange={(event) =>
              setFormState((prevState) => ({
                ...prevState,
                confirmPassword: event.target.value,
              }))
            }
          />
        </label>
        <button type='submit' className='w-min'>
          Register
        </button>
      </form>
    </>
  )
}

export default RegisterPage
