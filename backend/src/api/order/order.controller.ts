import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '@guards/jwt.guard'
import { UserRole } from '@entities/user.entity'
import { RolesGuard } from '@guards/role.guard'
import { OrderService } from './order.service'
import { CreateOrderDto } from './dto/create-order.dto'

@UseGuards(JwtAuthGuard)
@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
  ) {}

  @UseGuards(new RolesGuard([UserRole.USER, UserRole.ADMIN]))
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    const order = await this.orderService.create(createOrderDto)
    return { order }
  }

  @Get()
  findAll() {
    return this.orderService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id)
  }
}
