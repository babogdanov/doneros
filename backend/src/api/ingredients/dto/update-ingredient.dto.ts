import { IsNotEmpty } from 'class-validator'

export class UpdateIngredientDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  quantity: number
}
