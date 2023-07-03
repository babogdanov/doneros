import {
  Equal,
  In,
  MigrationInterface,
  QueryRunner,
  getConnection,
} from 'typeorm'

import { Address } from '@entities/address.entity'
import { createInstance } from '@utils/class.utils'
import { User, UserRole } from '@entities/user.entity'

let NEW_TEST_USER: Partial<User> = {
  email: 'mitio@doneros.com',
  password: 'doneros',
  role: UserRole.USER,
}

let ADDRESSES_TEST_DATA: Partial<Address>[] = [
  {
    city: 'София',
    street: 'ул. Любен Каравелов',
    number: 1,
    postalCode: 1000,
  },
  {
    city: 'Пловдив',
    street: 'ул. Съединение',
    number: 1,
    postalCode: 4000,
  },
]

let ADDRESSES_TEST_DATA_2: Partial<Address>[] = [
  {
    city: 'София',
    street: 'ул. Любен Каравелов',
    number: 1,
    postalCode: 1000,
  },
]

export class userAddresses1688217407261 implements MigrationInterface {
  private connection = getConnection('seed')
  private addressRepository = this.connection.getRepository(Address)
  private userRepository = this.connection.getRepository(User)

  public async up(queryRunner: QueryRunner): Promise<void> {
    const testUser = createInstance(User, NEW_TEST_USER)
    await this.userRepository.save(testUser)

    const genericUser = await this.userRepository.findOneOrFail({
      where: { email: Equal('user@doneros.com') },
    })

    const mitioUser = await this.userRepository.findOneOrFail({
      where: { email: Equal('mitio@doneros.com') },
    })

    ADDRESSES_TEST_DATA = ADDRESSES_TEST_DATA.map((data) =>
      createInstance(Address, { ...data, user: genericUser }),
    )

    ADDRESSES_TEST_DATA_2 = ADDRESSES_TEST_DATA_2.map((data) =>
      createInstance(Address, { ...data, user: mitioUser }),
    )

    await this.addressRepository.save([
      ...ADDRESSES_TEST_DATA,
      ...ADDRESSES_TEST_DATA_2,
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const addresses = ADDRESSES_TEST_DATA.map((data) => data.city)
    const new_test_user = NEW_TEST_USER.email

    const seededUser = await this.userRepository.findOneOrFail({
      where: { email: Equal(new_test_user) },
    })

    const seededAddresses = await this.addressRepository.find({
      where: { name: In(addresses) },
    })

    await this.userRepository.remove(seededUser)
    await this.addressRepository.remove(seededAddresses)
  }
}
