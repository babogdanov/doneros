import { Transform } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'
import { PasswordDto } from './password.dto'

export class ResetPasswordDto extends PasswordDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  token: string
}
