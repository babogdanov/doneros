import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Put,
} from '@nestjs/common'
import { JwtAuthGuard } from '@guards/jwt.guard'
import { UserRole } from '@entities/user.entity'
import { RolesGuard } from '@guards/role.guard'
import { OrderService } from './order.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'

@UseGuards(JwtAuthGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(new RolesGuard([UserRole.USER, UserRole.ADMIN]))
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    const order = await this.orderService.create(createOrderDto)
    return { order }
  }

  @Get('/all-available')
  async findAllAvailable() {
    const orders = await this.orderService.findAllAvailable()

    return { orders }
  }

  @Get('/courier/:id')
  async findAllForCourierId(@Param('id') courierId: number) {
    const courierOrders = await this.orderService.findForCourierId(courierId)
    return { orders: courierOrders }
  }

  @Get('/user/:id')
  async findAllForUserId(@Param('id') userId: number) {
    const userOrders = await this.orderService.findForUserId(userId)
    return { orders: userOrders }
  }

  @Put('/update')
  async updateOrder(@Body() updateOrderDto: UpdateOrderDto) {
    const order = await this.orderService.updateOrder(updateOrderDto)
    return { order }
  }
}
