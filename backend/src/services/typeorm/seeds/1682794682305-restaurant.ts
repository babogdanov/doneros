import { Restaurant } from '@entities/restaurant.entity';
import { createInstance } from '@utils/class.utils';
import { In, MigrationInterface, QueryRunner, getConnection } from "typeorm";

const TEST_RESTAURANT_DATA = [
  { name: 'При Белев', description: 'Горме кухня', address: 'Студентски град, блок 51, стая 226' },
  { name: 'При Мишака', description: 'Мазни дюнери', address: 'Люлин 5, ул. Ген. Мутафчийски №8' },
]

export class restaurant1682794682305 implements MigrationInterface {
  private connection = getConnection('seed')
  private restaurantRepository = this.connection.getRepository(Restaurant)

  public async up(queryRunner: QueryRunner): Promise<void> 
  {
    const TEST_RESTAURANTS = TEST_RESTAURANT_DATA.map((data) => createInstance(Restaurant, data))

    await this.restaurantRepository.save(TEST_RESTAURANTS)
  }

  public async down(queryRunner: QueryRunner): Promise<void> 
  {
    const restaurantNames = TEST_RESTAURANT_DATA.map((data) => data.name)

    const seededRestaurants = await this.restaurantRepository.find({
      where: { name: In(restaurantNames) },
    })

    await this.restaurantRepository.remove(seededRestaurants)
  }
}
