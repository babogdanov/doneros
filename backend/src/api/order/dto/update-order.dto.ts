import { OrderStatus } from '@entities/order.entity'
import { IsNotEmpty } from 'class-validator'

export class UpdateOrderDto {
  @IsNotEmpty()
  id: number

  @IsNotEmpty()
  status: OrderStatus

  courierId?: number
}
