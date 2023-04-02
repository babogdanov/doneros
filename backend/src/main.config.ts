import {
  BadRequestException,
  INestApplication,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common'

export const configure = (app: INestApplication) => {
  // NestJS app configuration
  app.enableCors()

  // Adds a global prefix to the each application HTTP route
  app.setGlobalPrefix('api', { exclude: ['/'] })

  // Global body request validator
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,
      exceptionFactory: (errors: ValidationError[]) =>
        new BadRequestException(
          Object.values(errors?.[0].constraints || [])?.[0],
        ),
    }),
  )
}
