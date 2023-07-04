import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

import type { FindConditions, Repository } from 'typeorm'

import type {
  CourierWithoutPassword,
  UserWithoutPassword,
} from '@models/user-without-password'

import { User } from '@entities/user.entity'
import { ResetToken } from '@entities/reset-token.entity'
import { Courier } from '@entities/courier.entity'
import { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
  constructor(
    // @ts-ignore
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    // @ts-ignore
    @InjectRepository(ResetToken)
    private readonly resetTokenRepository: Repository<ResetToken>,
    // @ts-ignore
    @InjectRepository(Courier)
    private readonly courierRepository: Repository<Courier>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
    isCourier: boolean,
  ): Promise<UserWithoutPassword | null> {
    let user
    if (isCourier) {
      user = await this.courierRepository.findOne({ email })
    } else {
      user = await this.userRepository.findOne({ email })
    }

    // user not found
    const isUser = !!user
    if (!isUser) {
      return null
    }

    // user found but provided wrong password
    const hasPasswordMatch = await bcrypt.compare(password, user.password)
    if (!hasPasswordMatch) {
      return null
    }

    // @ts-ignore
    delete user.password // do not return the user's password for security reasons

    return user
  }

  generateJWTToken(user: UserWithoutPassword | CourierWithoutPassword) {
    const accessToken = this.jwtService.sign({ ...user })
    return accessToken
  }

  async getUser(
    conditions: FindConditions<User>,
    isCourier: boolean,
  ): Promise<UserWithoutPassword | undefined> {
    let user
    if (isCourier) {
      user = await this.courierRepository.findOne(conditions)
    } else {
      user = await this.userRepository.findOne(conditions)
    }

    // @ts-ignore
    delete user?.password

    return user
  }

  async registerUser(registerDto: LoginDto) {
    const user = await this.userRepository.create({ ...registerDto }).save()
    // @ts-ignore
    delete user?.password

    return user
  }
}
