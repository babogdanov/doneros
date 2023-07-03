import { MigrationInterface, QueryRunner } from 'typeorm'

export class orderAddress1688411859757 implements MigrationInterface {
  name = 'orderAddress1688411859757'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order" ADD "address" character varying NOT NULL`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "address"`)
  }
}
