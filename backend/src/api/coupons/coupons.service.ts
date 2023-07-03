import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { User } from '@entities/user.entity'
import { Repository } from 'typeorm'
// import { CreateCouponDto } from './dto/create-coupon.dto';
// import { UpdateCouponDto } from './dto/update-coupon.dto';

@Injectable()
export class CouponsService {
  constructor(
    // @ts-ignore
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async updatePoints(id: number, price: number) {
    const points = Math.round(price / 10)
    await this.userRepository.update(id, { points })
  }

  // create(createCouponDto: CreateCouponDto) {
  //   return 'This action adds a new coupon';
  // }

  findAll() {
    return `This action returns all coupons`
  }

  findOne(id: number) {
    return `This action returns a #${id} coupon`
  }

  // update(id: number, updateCouponDto: UpdateCouponDto) {
  //   return `This action updates a #${id} coupon`;
  // }

  remove(id: number) {
    return `This action removes a #${id} coupon`
  }
}
