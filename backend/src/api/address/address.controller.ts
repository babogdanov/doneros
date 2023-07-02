import {
  Controller,
  Param,
  Delete,
} from '@nestjs/common'
import { AddressService } from './address.service'

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const address = await this.addressService.remove(+id)
    return { address }
  }
}
