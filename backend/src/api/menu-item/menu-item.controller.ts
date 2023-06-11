import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common'

import { MenuItemService } from './menu-item.service'
import { CreateMenuItemDto } from './dto/create-menu-item.dto'
import { UpdateMenuItemDto } from './dto/update-menu-item.dto'

@Controller('menu-item')
export class MenuItemController {
  constructor(private readonly menuItemService: MenuItemService) {}

  @Post()
  async create(@Body() createMenuItemDto: CreateMenuItemDto) {
    const menuItem = await this.menuItemService.create(createMenuItemDto)
    return { menuItem }
  }

  @Get()
  async findAll() {
    const menuItems = await this.menuItemService.findAll()
    return { menuItems }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const menuItem = await this.menuItemService.findOne(+id)
    return { menuItem }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMenuItemDto: UpdateMenuItemDto,
  ) {
    const menuItem = await this.menuItemService.update(+id, updateMenuItemDto)
    return { menuItem }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const menuItem = await this.menuItemService.remove(+id)
    return { menuItem }
  }
}
