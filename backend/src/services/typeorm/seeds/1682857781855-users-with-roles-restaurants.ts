import { In, MigrationInterface, getConnection } from 'typeorm'

import { User, UserRole } from '@entities/user.entity'
import { createInstance } from '@utils/class.utils'
import { Restaurant } from '@entities/restaurant.entity'

const USER_DATA: Partial<User>[] = [
  { email: 'user@doneros.com', password: 'doneros', role: UserRole.USER },
  { email: 'courier@doneros.com', password: 'doneros', role: UserRole.COURIER },
  { email: 'admin@doneros.com', password: 'doneros', role: UserRole.ADMIN },
]

const MANAGER_DATA: Partial<User>[] = [
  {
    email: 'managerBelev@doneros.com',
    password: 'doneros',
    role: UserRole.MANAGER,
  },
  {
    email: 'managerMishak@doneros.com',
    password: 'doneros',
    role: UserRole.MANAGER,
  },
]

const RESTAURANT_DATA: Partial<Restaurant>[] = [
  {
    name: 'При Белев',
    description: 'Гурме кухня',
    address: 'Студентски град, блок 51, стая 226',
  },

  {
    name: 'При Мишака',
    description: 'Мазни дюнери',
    address: 'Люлин 5, ул. Ген. Мутафчийски №8',
  },
]

export class usersWithRoles1687025332509 implements MigrationInterface {
  private connection = getConnection('seed')
  private userRepository = this.connection.getRepository(User)
  private restaurantRepository = this.connection.getRepository(Restaurant)

  public async up(): Promise<void> {
    const testUsers = USER_DATA.map((data) => createInstance(User, data))
    const testManagers = MANAGER_DATA.map((data) => createInstance(User, data))

    await this.userRepository.save(testUsers)
    const managerEntities = await this.userRepository.save(testManagers)
    const restaurants = RESTAURANT_DATA.map((restaurant, index) => ({
      ...restaurant,
      manager: managerEntities[index],
    }))
    await this.restaurantRepository.save(restaurants)
  }

  public async down(): Promise<void> {
    const restaurantNames = RESTAURANT_DATA.map((data) => data.name)
    const seededRestaurants = await this.restaurantRepository.find({
      where: { name: In(restaurantNames) },
    })

    await this.restaurantRepository.remove(seededRestaurants)

    const userEmails = USER_DATA.map((data) => data.email)
    const seededUsers = await this.userRepository.find({
      where: { email: In(userEmails) },
    })

    await this.userRepository.remove(seededUsers)
  }
}
