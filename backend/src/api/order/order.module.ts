import { Module } from '@nestjs/common'
import { Order } from '@entities/order.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '@entities/user.entity'
import { OrderService } from './order.service'
import { OrderController } from './order.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Order, User])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
