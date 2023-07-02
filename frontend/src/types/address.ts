export type Address = {
  id: number
  city: string
  street: string
  number: number
  postalCode: number
}

export type AddressResponse = {
  address: Address
}
