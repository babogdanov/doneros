import { ConfigModule, ConfigService } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'

import { User } from '@entities/user.entity'
import { ResetToken } from '@entities/reset-token.entity'
import { Courier } from '@entities/courier.entity'
import { AuthService } from './auth.service'
import { JwtStrategy } from '../../auth/strategies/jwt.strategy'
import { AuthController } from './auth.controller'

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([User, ResetToken, Courier]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_TIMEOUT'),
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
