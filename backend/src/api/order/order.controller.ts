import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
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
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto)
  }

  @Get()
  findAll() {
    return this.orderService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id)
  }
}
