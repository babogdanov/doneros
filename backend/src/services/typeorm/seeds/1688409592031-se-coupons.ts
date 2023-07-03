import { UserCoupons } from '@entities/user-coupons.entity'
import { User } from '@entities/user.entity'
import { createInstance } from '@utils/class.utils'
import { MigrationInterface, getConnection } from 'typeorm'

export class seCoupons1688409592031 implements MigrationInterface {
  private connection = getConnection('seed')
  private userRepository = this.connection.getRepository(User)
  private couponsRepository = this.connection.getRepository(UserCoupons)

  public async up(): Promise<void> {
    const users = await this.userRepository.find()
    await Promise.all(users.map(async (user) => {
        const couponsData: Partial<UserCoupons> = createInstance(UserCoupons, { 
            freeDelivery: 0,
            thirtyPercentOff: 0,
            tenPercentOff: 0,
            twentyPercentOff: 0,
            fiftyPercentOff: 0,
          })
          const coupons = await this.couponsRepository.save(couponsData)
          await this.userRepository.update(user.id, { coupons })
    }))
  }

  public async down(): Promise<void> {
    const users = await this.userRepository.find()
    users.forEach(async (user) => {
      const updatedUser = { ...user, couponId: null }
      await this.userRepository.update(user.id, updatedUser)
    })
  }
}
