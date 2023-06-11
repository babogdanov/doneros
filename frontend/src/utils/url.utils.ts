const isValidUrl = (input: string) => {
  try {
    new URL(input)
    return true
  } catch (err) {
    return false
  }
}

export default isValidUrl
