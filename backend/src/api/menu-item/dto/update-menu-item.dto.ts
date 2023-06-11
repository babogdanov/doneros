import { IsNotEmpty } from 'class-validator'

export class UpdateMenuItemDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  description: string

  @IsNotEmpty()
  pictureUrl: string
}
