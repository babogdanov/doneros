import { MigrationInterface, QueryRunner } from 'typeorm'

export class courierFix1688459354484 implements MigrationInterface {
  name = 'courierFix1688459354484'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "courier" ADD "isCourier" boolean NOT NULL DEFAULT true`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "courier" DROP COLUMN "isCourier"`)
  }
}
