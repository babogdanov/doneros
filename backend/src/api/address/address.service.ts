import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Address } from '@entities/address.entity'

@Injectable()
export class AddressService {
  constructor(
    // @ts-ignore
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async remove(id: number) {
    const res = await this.addressRepository.delete(id)
    return res
  }
}
