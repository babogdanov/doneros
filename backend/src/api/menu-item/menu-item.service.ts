import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { MenuItem } from '@entities/menu-item.entity'
import { UpdateMenuItemDto } from './dto/update-menu-item.dto'
import { CreateMenuItemDto } from './dto/create-menu-item.dto'

@Injectable()
export class MenuItemService {
  constructor(
    // @ts-ignore
    @InjectRepository(MenuItem)
    private readonly menuItemRepository: Repository<MenuItem>,
  ) {}

  create(createMenuItemDto: CreateMenuItemDto) {
    return this.menuItemRepository.create({ ...createMenuItemDto}).save()
  }

  findAll() {
    return `This action returns all menuItem`
  }

  findOne(id: number) {
    return this.menuItemRepository.findOne({ id }, { relations: ['restaurant']})
  }

  update(id: number, updateMenuItemDto: UpdateMenuItemDto) {
    return this.menuItemRepository.update(id, updateMenuItemDto)
  }

  remove(id: number) {
    return this.menuItemRepository.delete(id)
  }
}
