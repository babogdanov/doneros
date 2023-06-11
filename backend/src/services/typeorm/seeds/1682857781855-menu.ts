import { MenuItem } from '@entities/menu-item.entity'
import { Restaurant } from '@entities/restaurant.entity'
import { createInstance } from '@utils/class.utils'
import { create } from 'domain'
import {
  Equal,
  In,
  MigrationInterface,
  QueryRunner,
  getConnection,
} from 'typeorm'

let TEST_MENU_ITEMS_DATA: Partial<MenuItem>[] = [
  {
    name: 'Ушички в масло',
    description: 'Мазнички свински ушички приготвени в масло',
    pictureUrl:
      'http://doyoulovetoeat.com/wp-content/uploads/2019/12/DSC_0257.jpg',
  },
]

let TEST_MENU_ITEMS_DATA_2: Partial<MenuItem>[] = [
  {
    name: 'Дюнер - малък',
    description: 'Мазен дюнер',
    pictureUrl: 'https://www.aladinfoods.bg/files/images/294/light_duner.png',
  },
  {
    name: 'Дюнер - среден',
    description: 'Мазен дюнер',
    pictureUrl: 'https://www.aladinfoods.bg/files/images/294/light_duner.png',
  },
  {
    name: 'Дюнер - голям',
    description: 'Мазен дюнер',
    pictureUrl: 'https://www.aladinfoods.bg/files/images/294/light_duner.png',
  },
]

export class menu1682857781855 implements MigrationInterface {
  private connection = getConnection('seed')
  private menuRepository = this.connection.getRepository(MenuItem)
  private restaurantRepository = this.connection.getRepository(Restaurant)

  public async up(): Promise<void> {
    const belevRestaurant = await this.restaurantRepository.findOneOrFail({
      where: { name: Equal('При Белев') },
    })

    const mishoRestaurant = await this.restaurantRepository.findOneOrFail({
      where: { name: Equal('При Мишака') },
    })

    TEST_MENU_ITEMS_DATA = TEST_MENU_ITEMS_DATA.map((data) =>
      createInstance(MenuItem, { ...data, restaurant: belevRestaurant }),
    )

    TEST_MENU_ITEMS_DATA_2 = TEST_MENU_ITEMS_DATA_2.map((data) =>
      createInstance(MenuItem, { ...data, restaurant: mishoRestaurant }),
    )

    await this.menuRepository.save([
      ...TEST_MENU_ITEMS_DATA,
      ...TEST_MENU_ITEMS_DATA_2,
    ])
  }

  public async down(): Promise<void> {
    const menuItemNames = TEST_MENU_ITEMS_DATA.map((data) => data.name)

    const seededMenuItems = await this.menuRepository.find({
      where: { name: In(menuItemNames) },
    })

    await this.menuRepository.remove(seededMenuItems)
  }
}
