import { Module } from '@nestjs/common';
import { Ingredient } from '@entities/ingredients.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Ingredient])],
  controllers: [IngredientsController],
  providers: [IngredientsService]
})
export class IngredientsModule {}
