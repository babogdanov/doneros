import { PartialType } from '@nestjs/mapped-types';
import { Restaurant } from '@entities/restaurant.entity';
import { IsNotEmpty } from 'class-validator';
import { UpdateMenuItemDto } from './update-menu-item.dto';

export class CreateMenuItemDto extends PartialType(UpdateMenuItemDto) {
    @IsNotEmpty()
    restaurant: Restaurant
}
