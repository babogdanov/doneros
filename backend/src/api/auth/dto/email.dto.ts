import { Transform } from 'class-transformer'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class EmailDto {
  @IsEmail({}, { message: 'Please enter a valid email.' })
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  email: string
}
