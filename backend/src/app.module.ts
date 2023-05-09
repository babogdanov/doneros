import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { getConnectionOptions } from 'typeorm'
import * as Joi from 'joi'

import { AuthModule } from './api/auth/auth.module'
import { RestaurantModule } from '@api/restaurant/restaurant.module'

@Module({
  imports: [
    // Configuration Modules
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .required(),
        PORT: Joi.number().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_TIMEOUT: Joi.string().required(),
        PASSWORD_RESET_TOKEN_EXPIRATION: Joi.number().required(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          entities: ['dist/**/*.entity{.ts,.js}'],
          migrations: ['dist/services/typeorm/migrations/*.{.ts,.js}'],
        }),
    }),
    // App Modules
    AuthModule,
    RestaurantModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
