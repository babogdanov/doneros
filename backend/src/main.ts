import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { configure } from './main.config'

import 'reflect-metadata'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  configure(app)
  await app.listen(process.env.PORT!)
}
bootstrap()
