import {
  Controller,
  Param,
  Body,
  Post,
  Delete,
} from '@nestjs/common'
import { AddressService } from './address.service'
import { CreateAddressDto } from './dto/create-address.dto'

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async create(@Body() createAddressDto: CreateAddressDto) {
    const menuItem = await this.addressService.create(createAddressDto)
    return { menuItem }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const address = await this.addressService.remove(+id)
    return { address }
  }
}
