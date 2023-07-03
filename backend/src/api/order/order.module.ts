import { Module } from '@nestjs/common'
import { Order } from '@entities/order.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CouponsService } from '@api/coupons/coupons.service'
import { User } from '@entities/user.entity'
import { CouponsModule } from '@api/coupons/coupons.module'
import { OrderService } from './order.service'
import { OrderController } from './order.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Order, User]), CouponsModule],
  controllers: [OrderController],
  providers: [OrderService, CouponsService],
})
export class OrderModule {}
