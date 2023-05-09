import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  async getAll() {
    const restaurants = await this.restaurantService.getAllRestaurant();
    return { restaurants }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.restaurantService.getRestaurant(+id);
  }

  @Post()
  async create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return await this.restaurantService.createRestaurant(createRestaurantDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRestaurantDto: UpdateRestaurantDto) {
    return await this.restaurantService.updateRestaurant(+id, updateRestaurantDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.restaurantService.removeRestaurant(+id);
  }
}
