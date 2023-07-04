import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common'
import { JwtAuthGuard } from '@guards/jwt.guard'
import { RolesGuard } from '@guards/role.guard'
import { UserRole } from '@entities/user.entity'
import { IngredientsService } from './ingredients.service'
import { CreateIngredientDto } from './dto/create-ingredient.dto'
import { UpdateIngredientDto } from './dto/update-ingredient.dto'

@Controller('storage')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Get()
  async findAll() {
    const ingredients = await this.ingredientsService.findAll()
    return { ingredients }
  }

  @Get(':id')
  async findByRestaurantId(@Param('id') id: string) {
    const ingredients = await this.ingredientsService.findByRestaurantId(+id)
    return { ingredients }
  }

  @UseGuards(JwtAuthGuard, new RolesGuard([UserRole.ADMIN, UserRole.MANAGER]))
  @Post()
  async create(@Body() createIngredientDto: CreateIngredientDto) {
    const ingredient = await this.ingredientsService.create(createIngredientDto)
    return { ingredient }
  }

  @UseGuards(JwtAuthGuard, new RolesGuard([UserRole.ADMIN, UserRole.MANAGER]))
  @Put(':id')
  async update1(
    @Param('id') id: string,
    @Body() updateIngredientDto: UpdateIngredientDto,
  ) {
    const menuItem = await this.ingredientsService.update(
      +id,
      updateIngredientDto,
    )
    return { menuItem }
  }

  @UseGuards(JwtAuthGuard, new RolesGuard([UserRole.ADMIN, UserRole.MANAGER]))
  @Delete(':id')
  async remove1(@Param('id') id: string) {
    const ingredient = await this.ingredientsService.remove(+id)
    return { ingredient }
  }
}
