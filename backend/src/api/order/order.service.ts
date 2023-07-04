import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { createInstance } from '@utils/class.utils'
import { User } from '@entities/user.entity'
import { Repository } from 'typeorm'
import { Order } from '@entities/order.entity'
import { Address } from '@entities/address.entity'
import { CreateOrderDto } from './dto/create-order.dto'

@Injectable()
export class OrderService {
  constructor(
    // @ts-ignore
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    // @ts-ignore
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { userId, addressId, ...orderDto } = createOrderDto
    const user = createInstance(User, { id: userId })
    const address = createInstance(Address, { id: +addressId })
    const order = await this.orderRepository
      .create({ ...orderDto, user, address })
      .save()
    const points = Math.round(order.price / 10)
    await this.userRepository.update(userId, { points })
    
    return { order }
  }

  findAll() {
    return `This action returns all order`
  }

  findOne(id: number) {
    return `This action returns a #${id} order`
  }
}
