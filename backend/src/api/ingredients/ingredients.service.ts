import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { createInstance } from '@utils/class.utils'
import { Restaurant } from '@entities/restaurant.entity'
import { Ingredient } from '@entities/ingredients.entity'
import { CreateIngredientDto } from './dto/create-ingredient.dto'
import { UpdateIngredientDto } from './dto/update-ingredient.dto'

@Injectable()
export class IngredientsService {
  constructor(
    // @ts-ignore
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  async create(createIngredientDto: CreateIngredientDto) {
    const { restaurantId, ...ingredientDto } = createIngredientDto
    const restaurantDto = createInstance(Restaurant, { id: +restaurantId })
    const { id } = await this.ingredientRepository
      .create({ ...ingredientDto, restaurant: restaurantDto })
      .save()

    const res = await this.findOne(id)
    return res
  }

  async findAll() {
    const res = await this.ingredientRepository.find({
      relations: ['restaurant'],
    })
    return res
  }

  async findOne(id: number) {
    const res = await this.ingredientRepository.findOne(
      { id },
      { relations: ['restaurant'] },
    )
    return res
  }

  async findByRestaurantId(restaurantId: number) {
    const res = await this.ingredientRepository.find({
      where: { restaurant: { id: restaurantId } },
      relations: ['restaurant'],
    })
    return res
  }

  async update(id: number, updateIngredientDto: UpdateIngredientDto) {
    await this.ingredientRepository.update(id, updateIngredientDto)
    const res = await this.findOne(id)
    return res
  }

  async remove(id: number) {
    const res = await this.ingredientRepository.delete(id)
    return res
  }
}
