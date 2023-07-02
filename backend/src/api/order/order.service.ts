import { Injectable } from '@nestjs/common'
import { createInstance } from '@utils/class.utils'
import { User } from '@entities/user.entity'
import { Repository } from 'typeorm'
import { Order } from '@entities/order.entity'
import { CreateOrderDto } from './dto/create-order.dto'

@Injectable()
export class OrderService {
  constructor(
    // @ts-ignore
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { userId, ...orderDto } = createOrderDto
    const userDto = createInstance(User, { id: +userId })
    const { id } = await this.orderRepository
      .create({ ...orderDto, user: userDto })
      .save()

    const order = await this.findOne(id)
    return { order }
  }

  findAll() {
    return `This action returns all order`
  }

  findOne(id: number) {
    return `This action returns a #${id} order`
  }
}
