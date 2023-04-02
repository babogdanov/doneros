import 'reflect-metadata'

import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { configure } from './main.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  configure(app)
  await app.listen(process.env.PORT!)
}
bootstrap()
