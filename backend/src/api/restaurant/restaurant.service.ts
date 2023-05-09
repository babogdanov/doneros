import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateRestaurantDto } from './dto/create-restaurant.dto'
import { UpdateRestaurantDto } from './dto/update-restaurant.dto'
import { Restaurant } from '@entities/restaurant.entity'
import { createInstance } from '@utils/class.utils'

@Injectable()
export class RestaurantService {
  constructor(
    // @ts-ignore
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {}

  async getAllRestaurant() {
    return await this.restaurantRepository.find()
  }
  
  async getRestaurant(id: number) {
    const restaurant = await this.restaurantRepository.findOne({ id })
    
    if (!restaurant) {
      throw new NotFoundException('User not found.')
    }
  
    return restaurant;
  }

  async createRestaurant(createRestaurantDto: CreateRestaurantDto) {
    return await this.restaurantRepository.create({ ...createRestaurantDto }).save
  }

  async updateRestaurant(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    return await this.restaurantRepository.update({ id }, { ...updateRestaurantDto })
  }

  async removeRestaurant(id: number) {
    return await this.restaurantRepository.delete({ id })
  }
}
