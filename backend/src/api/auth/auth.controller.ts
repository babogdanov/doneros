import {
  Controller,
  Req,
  Post,
  UseGuards,
  Get,
  Body,
  UnauthorizedException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common'

import type { Request } from '@models/request'
import type { UserWithAccessToken } from '@models/user-with-access-token'
import { JwtAuthGuard } from '@guards/jwt.guard'
import { LoginDto } from './dto/login.dto'

import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('sync')
  async sync(@Req() req: Request): Promise<UserWithAccessToken> {
    const userWithoutPassword = await this.authService.getUser({
      id: req.user.id,
    })

    if (!userWithoutPassword) {
      throw new NotFoundException('User not found.')
    }
    const accessToken = this.authService.generateJWTToken(userWithoutPassword)

    return { ...userWithoutPassword, accessToken }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<UserWithAccessToken> {
    const { email, password } = loginDto
    const userWithoutPassword = await this.authService.validateUser(
      email,
      password,
    )

    if (!userWithoutPassword) {
      throw new UnauthorizedException(
        'Authentication failed, please check your credentials.',
      )
    }

    const accessToken = this.authService.generateJWTToken(userWithoutPassword)

    return { ...userWithoutPassword, accessToken }
  }

  @Post('register')
  async register(@Body() registerDto: LoginDto) {
    const userExists = await this.authService.getUser({
      email: registerDto.email,
    })

    if (userExists) {
      throw new ConflictException('User already exists.')
    }

    const user = await this.authService.registerUser(registerDto)
    return user
  }
}
