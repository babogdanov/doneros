import { Transform } from 'class-transformer'
import { IsNotEmpty, IsEmail } from 'class-validator'

import { PasswordDto } from './password.dto'

export class RegisterDto extends PasswordDto {
  @IsEmail({}, { message: 'Please enter a valid email.' })
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  email: string
}
