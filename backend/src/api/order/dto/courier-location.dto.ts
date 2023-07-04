import { IsNotEmpty } from 'class-validator'

export class CourierLocationDto {
  @IsNotEmpty()
  courierId: number

  location: {
    latitude: number

    longitude: number
  }
}
