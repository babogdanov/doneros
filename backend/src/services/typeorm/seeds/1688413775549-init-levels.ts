import { Level } from '@entities/level.entity'
import { User } from '@entities/user.entity'
import { MigrationInterface, getConnection } from 'typeorm'

export class initLevels1688413775549 implements MigrationInterface {
  private connection = getConnection('seed')
  private userRepository = this.connection.getRepository(User)
  private levelRepository = this.connection.getRepository(Level)

  public async up(): Promise<void> {
    const level = await this.levelRepository.findOneOrFail(1)
    const users = await this.userRepository.find()
    await Promise.all(
      users.map(async (user) => {
        await this.userRepository.update(user.id, { level })
      }),
    )
  }

  public async down(): Promise<void> {
    const users = await this.userRepository.find()
    users.forEach(async (user) => {
      const updatedUser = { ...user, levelId: null }
      await this.userRepository.update(user.id, updatedUser)
    })
  }
}
