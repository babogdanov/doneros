import { IsNotEmpty } from 'class-validator'

export class CreateOrderDto {
  @IsNotEmpty()
  paymentMethod: string

  @IsNotEmpty()
  addressId: string

  @IsNotEmpty()
  price: number

  @IsNotEmpty()
  userId: number
}
