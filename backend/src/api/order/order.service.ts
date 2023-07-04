import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { createInstance } from '@utils/class.utils'
import { User } from '@entities/user.entity'
import { Repository } from 'typeorm'
import { Order, OrderStatus } from '@entities/order.entity'
import { Address } from '@entities/address.entity'
import { MenuItem } from '@entities/menu-item.entity'
import { Courier } from '@entities/courier.entity'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { CourierLocationDto } from './dto/courier-location.dto'

@Injectable()
export class OrderService {
  constructor(
    // @ts-ignore
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    // @ts-ignore
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    // @ts-ignore
    @InjectRepository(MenuItem)
    private readonly menuItemRepository: Repository<MenuItem>,
    // @ts-ignore
    @InjectRepository(Courier)
    private readonly courierRepository: Repository<Courier>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { userId, addressId, menuItemIds, ...orderDto } = createOrderDto

    const user = createInstance(User, { id: userId })
    const address = createInstance(Address, { id: addressId })
    const menuItems = menuItemIds.map((id) => createInstance(MenuItem, { id }))

    const order = await this.orderRepository
      .create({ ...orderDto, user, address, menuItems })
      .save()
    const points = Math.round(order.price / 10)
    await this.userRepository.update(userId, { points })

    return { order }
  }

  async findAllAvailable() {
    const orders = await this.orderRepository.find({
      where: { status: OrderStatus.CREATED },
      relations: ['menuItems', 'menuItems.restaurant', 'courier'],
    })
    return orders
  }

  async findForCourierId(courierId: number) {
    const courier = await this.courierRepository.findOneOrFail(courierId)
    const orders = await this.orderRepository.find({
      where: { courier },
      relations: ['menuItems', 'menuItems.restaurant', 'courier'],
    })
    return orders
  }

  async findForUserId(userId: number) {
    const user = await this.userRepository.findOneOrFail(userId)
    const orders = await this.orderRepository.find({
      where: { user },
      relations: ['menuItems', 'menuItems.restaurant', 'courier'],
    })
    return orders
  }

  async updateOrder(updateOrderDto: UpdateOrderDto) {
    const { id, status, courierId } = updateOrderDto
    const courier = createInstance(Courier, { id: courierId })
    const updateValues = courierId ? { status, courier } : { status }
    const order = await this.orderRepository.update(id, updateValues)
    return order
  }

  async updateCourierLocation(courierLocationDto: CourierLocationDto) {
    const {
      courierId,
      // location: { latitude, longitude },
    } = courierLocationDto
    const { latitude, longitude } = await this.courierRepository.findOneOrFail(
      courierId,
    )
    await this.courierRepository.update(courierId, {
      latitude: +latitude - 0.0001,
      longitude: +longitude - 0.0001,
    })
    return { courierId, latitude, longitude }
  }

  async findCourierLocation(courierId: number) {
    const { latitude, longitude } = await this.courierRepository.findOneOrFail(
      courierId,
    )
    return { latitude, longitude }
  }

  async findOne(orderId: number) {
    const order = await this.orderRepository.findOneOrFail(orderId, {
      relations: ['courier'],
    })
    return order
  }
}
