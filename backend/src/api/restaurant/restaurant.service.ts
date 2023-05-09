import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Restaurant } from '@entities/restaurant.entity'
import { CreateRestaurantDto } from './dto/create-restaurant.dto'
import { UpdateRestaurantDto } from './dto/update-restaurant.dto'

@Injectable()
export class RestaurantService {
  constructor(
    // @ts-ignore
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {}

  async getAllRestaurant() {
    const restaurants = await this.restaurantRepository.find()
    return restaurants
  }

  async getRestaurant(id: number) {
    const restaurant = await this.restaurantRepository.findOne({ id })

    if (!restaurant) {
      throw new NotFoundException('User not found.')
    }

    return restaurant
  }

  async createRestaurant(createRestaurantDto: CreateRestaurantDto) {
    const restaurant = await this.restaurantRepository
      .create({ ...createRestaurantDto })
      .save()
    return restaurant
  }

  async updateRestaurant(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    const restaurant = await this.restaurantRepository.update(
      { id },
      { ...updateRestaurantDto },
    )
    return restaurant
  }

  async removeRestaurant(id: number) {
    const restaurant = await this.restaurantRepository.delete({ id })
    return restaurant
  }
}
