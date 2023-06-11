import { PartialType } from '@nestjs/mapped-types'
import { IsNotEmpty } from 'class-validator'
import { UpdateMenuItemDto } from './update-menu-item.dto'

export class CreateMenuItemDto extends PartialType(UpdateMenuItemDto) {
  @IsNotEmpty()
  restaurantId: string
}
