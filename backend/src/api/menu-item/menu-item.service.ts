import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { MenuItem } from '@entities/menu-item.entity'
import { Restaurant } from '@entities/restaurant.entity'
import { createInstance } from '@utils/class.utils'
import { CreateMenuItemDto } from './dto/create-menu-item.dto'
import { UpdateMenuItemDto } from './dto/update-menu-item.dto'

@Injectable()
export class MenuItemService {
  constructor(
    // @ts-ignore
    @InjectRepository(MenuItem)
    private readonly menuItemRepository: Repository<MenuItem>,
  ) {}

  async create(createMenuItemDto: CreateMenuItemDto) {
    const { restaurantId, ...menuItemDto } = createMenuItemDto
    const restaurantDto = createInstance(Restaurant, { id: +restaurantId })
    const { id } = await this.menuItemRepository
      .create({ ...menuItemDto, restaurant: restaurantDto })
      .save()
    const res = await this.findOne(id)

    return res
  }

  async findAll() {
    const res = await this.menuItemRepository.find({
      relations: ['restaurant'],
    })
    return res
  }

  async findOne(id: number) {
    const res = await this.menuItemRepository.findOne(
      { id },
      { relations: ['restaurant'] },
    )
    return res
  }

  async update(id: number, updateMenuItemDto: UpdateMenuItemDto) {
    await this.menuItemRepository.update(id, updateMenuItemDto)
    const res = await this.findOne(id)
    return res
  }

  async remove(id: number) {
    const res = this.menuItemRepository.delete(id)
    return res
  }
}
