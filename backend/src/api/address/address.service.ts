import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Address } from '@entities/address.entity'
import { User } from '@entities/user.entity'
import { createInstance } from '@utils/class.utils'
import { CreateAddressDto } from './dto/create-address.dto'

@Injectable()
export class AddressService {
  constructor(
    // @ts-ignore
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async create(createAddressDto: CreateAddressDto) {
    const { userId, ...addressDto } = createAddressDto
    const userDto = createInstance(User, { id: +userId })
    const { id } = await this.addressRepository
      .create({ ...addressDto, user: userDto })
      .save()
    const res = await this.findOne(id)

    return res
  }

  async findOne(id: number) {
    const res = await this.addressRepository.findOne(
      { id },
      { relations: ['user'] },
    )

    return res
  }

  async remove(id: number) {
    const res = await this.addressRepository.delete(id)
    return res
  }
}
