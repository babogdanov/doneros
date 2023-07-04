import { MigrationInterface, QueryRunner } from 'typeorm'

export class courierLocation1688467454277 implements MigrationInterface {
  name = 'courierLocation1688467454277'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "courier" ADD "latitude" numeric`)
    await queryRunner.query(`ALTER TABLE "courier" ADD "longitude" numeric`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "courier" DROP COLUMN "longitude"`)
    await queryRunner.query(`ALTER TABLE "courier" DROP COLUMN "latitude"`)
  }
}
