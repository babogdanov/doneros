import { IsNotEmpty } from 'class-validator'

export class CreateOrderDto {
  @IsNotEmpty()
  paymentMethod: string

  @IsNotEmpty()
  addressId: number

  @IsNotEmpty()
  price: number

  @IsNotEmpty()
  userId: number

  @IsNotEmpty()
  menuItemIds: number[]
}
