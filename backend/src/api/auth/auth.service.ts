import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

import type { FindConditions, Repository } from 'typeorm'

import type { UserWithoutPassword } from '@models/user-without-password'

import { User } from '@entities/user.entity'
import { ResetToken } from '@entities/reset-token.entity'
import { RegisterDto } from './dto/register.dto'

@Injectable()
export class AuthService {
  constructor(
    // @ts-ignore
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    // @ts-ignore
    @InjectRepository(ResetToken)
    private readonly resetTokenRepository: Repository<ResetToken>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserWithoutPassword | null> {
    const user = await this.userRepository.findOne({ email })

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

  generateJWTToken(user: UserWithoutPassword) {
    const accessToken = this.jwtService.sign({ ...user })
    return accessToken
  }

  async getUser(
    conditions: FindConditions<User>,
  ): Promise<UserWithoutPassword | undefined> {
    const user = await this.userRepository.findOne(conditions)
    // @ts-ignore
    delete user?.password

    return user
  }

  async registerUser(registerDto: RegisterDto) {
    const user = await this.userRepository.create({ ...registerDto }).save()
    // @ts-ignore
    delete user?.password

    return user
  }
}
