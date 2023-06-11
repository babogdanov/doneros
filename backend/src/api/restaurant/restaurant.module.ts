import { Module } from '@nestjs/common'
import { Restaurant } from '@entities/restaurant.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RestaurantService } from './restaurant.service'
import { RestaurantController } from './restaurant.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant])],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModule {}
