interface ValidationInput {
  input: string | string[]
  validationFunc: (input: string | string[]) => boolean
  errorMessage: string
}

const useValidation = (
  validationInputs: ValidationInput[],
): [isValid: boolean, errorMessage?: string] => {
  const validateInputs = validationInputs.map((validationInput) => {
    const { input, validationFunc, errorMessage } = validationInput
    const isValid = validationFunc(input)
    return { isValid, errorMessage }
  })

  const error = validateInputs.find((x) => !x.isValid)

  if (error) {
    return [false, error.errorMessage]
  }

  return [true]
}

export default useValidation
