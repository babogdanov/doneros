import { PartialType } from '@nestjs/mapped-types'
import { IsNotEmpty } from 'class-validator'
import { UpdateIngredientDto } from './update-ingredient.dto'

export class CreateIngredientDto extends PartialType(UpdateIngredientDto) {
  @IsNotEmpty()
  restaurantId: string
}
