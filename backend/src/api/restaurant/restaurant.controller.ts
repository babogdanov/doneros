import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common'
import { RestaurantService } from './restaurant.service'
import { CreateRestaurantDto } from './dto/create-restaurant.dto'
import { UpdateRestaurantDto } from './dto/update-restaurant.dto'

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  async getAll() {
    const restaurants = await this.restaurantService.getAllRestaurant()
    return { restaurants }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const restaurant = await this.restaurantService.getRestaurant(+id)
    return { restaurant }
  }

  @Post()
  async create(@Body() createRestaurantDto: CreateRestaurantDto) {
    const restaurant = await this.restaurantService.createRestaurant(
      createRestaurantDto,
    )
    return { restaurant }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    const restaurant = await this.restaurantService.updateRestaurant(
      +id,
      updateRestaurantDto,
    )
    return { restaurant }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const restaurant = await this.restaurantService.removeRestaurant(+id)
    return { restaurant }
  }
}
