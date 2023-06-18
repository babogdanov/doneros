import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common'
import { UserRole } from '@entities/user.entity'
import { RolesGuard } from 'src/auth/guards/role.guard'
import { JwtAuthGuard } from '@guards/jwt.guard'
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

  @Get('/manager/:managerId')
  async getForManagerId(@Param('managerId') managerId: number) {
    const restaurant = await this.restaurantService.getManagerRestaurant(
      managerId,
    )
    return { restaurant }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const restaurant = await this.restaurantService.getRestaurant(+id)
    return { restaurant }
  }

  @UseGuards(JwtAuthGuard, new RolesGuard([UserRole.ADMIN, UserRole.MANAGER]))
  @Post()
  async create(@Body() createRestaurantDto: CreateRestaurantDto) {
    const restaurant = await this.restaurantService.createRestaurant(
      createRestaurantDto,
    )
    return { restaurant }
  }

  @UseGuards(JwtAuthGuard, new RolesGuard([UserRole.ADMIN, UserRole.MANAGER]))
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

  @UseGuards(JwtAuthGuard, new RolesGuard([UserRole.ADMIN, UserRole.MANAGER]))
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const restaurant = await this.restaurantService.removeRestaurant(+id)
    return { restaurant }
  }
}
