import { IsNotEmpty } from 'class-validator'

export class CreateAddressDto {
  @IsNotEmpty()
  userId: string

  @IsNotEmpty()
  city: string

  @IsNotEmpty()
  street: string

  @IsNotEmpty()
  number: number

  @IsNotEmpty()
  postalCode: number
}
