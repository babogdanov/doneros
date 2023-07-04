import { Courier } from '@entities/courier.entity'
import { createInstance } from '@utils/class.utils'
import { MigrationInterface, getConnection } from 'typeorm'

const COURIER_DATA = { email: 'courier@doneros.com', password: 'doneros' }

export class courier1688459423703 implements MigrationInterface {
  private connection = getConnection('seed')
  private courierRepository = this.connection.getRepository(Courier)

  public async up(): Promise<void> {
    await this.courierRepository.save(createInstance(Courier, COURIER_DATA))
  }

  public async down(): Promise<void> {
    const seededCourier = await this.courierRepository.findOneOrFail({
      where: { email: COURIER_DATA.email },
    })

    await this.courierRepository.remove(seededCourier)
  }
}
