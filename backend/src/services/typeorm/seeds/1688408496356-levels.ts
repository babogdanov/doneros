import { Level } from '@entities/level.entity'
import { createInstance } from '@utils/class.utils'
import { In, MigrationInterface, QueryRunner, getConnection } from 'typeorm'

let LEVEL_DATA: Partial<Level>[] = [
  {
    name: 'Level 1',
    points: 50,
  },
  {
    name: 'Level 2',
    points: 100,
  },
  {
    name: 'Level 3',
    points: 200,
  },
  {
    name: 'Level 4',
    points: 350,
  },
  {
    name: 'Level 5',
    points: 500,
  },
]

export class levels1688408496356 implements MigrationInterface {
  private connection = getConnection('seed')
  private levelRepository = this.connection.getRepository(Level)

  public async up(queryRunner: QueryRunner): Promise<void> {

    LEVEL_DATA = LEVEL_DATA.map((data) =>
        createInstance(Level, { ...data }),
    )

    await this.levelRepository.save(LEVEL_DATA);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const levelNames = LEVEL_DATA.map((data) => data.name)

    const seededLevels = await this.levelRepository.find({
      where: { name: In(levelNames) },
    })

    await this.levelRepository.remove(seededLevels)
  }
}
