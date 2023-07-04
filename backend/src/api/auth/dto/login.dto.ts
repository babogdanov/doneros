import { Transform } from 'class-transformer'
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator'
import { EmailDto } from './email.dto'

export class LoginDto extends EmailDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  password: string

  @IsBoolean()
  isCourier: boolean
}
