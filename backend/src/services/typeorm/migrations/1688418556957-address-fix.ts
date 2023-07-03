import { MigrationInterface, QueryRunner } from 'typeorm'

export class addressFix1688418556957 implements MigrationInterface {
  name = 'addressFix1688418556957'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order" RENAME COLUMN "address" TO "addressId"`,
    )
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "addressId"`)
    await queryRunner.query(`ALTER TABLE "order" ADD "addressId" integer`)
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_73f9a47e41912876446d047d015" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_73f9a47e41912876446d047d015"`,
    )
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "addressId"`)
    await queryRunner.query(
      `ALTER TABLE "order" ADD "addressId" character varying NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "order" RENAME COLUMN "addressId" TO "address"`,
    )
  }
}
