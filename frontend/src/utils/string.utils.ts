// eslint-disable-next-line @typescript-eslint/ban-types
export const trimObjectStrings = <T extends {}>(obj: T): T => {
  const trimmedObject = JSON.parse(JSON.stringify(obj)) // deep clone the object

  Object.keys(trimmedObject).forEach((key) => {
    const objectKey = key as keyof T
    const objectValue = trimmedObject[objectKey]
    const isStringValue = typeof objectValue === 'string'

    if (isStringValue) {
      trimmedObject[objectKey] = objectValue.trim()
    } else {
      trimmedObject[objectKey] = objectValue
    }
  })

  return trimmedObject
}
