import { MigrationInterface, QueryRunner } from 'typeorm'

export class restaurantManager1687089585306 implements MigrationInterface {
  name = 'restaurantManager1687089585306'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "restaurant" ADD "managerId" integer`)
    await queryRunner.query(
      `ALTER TABLE "restaurant" ADD CONSTRAINT "UQ_7a0df7028ab735331618a439bb2" UNIQUE ("managerId")`,
    )
    await queryRunner.query(
      `ALTER TABLE "restaurant" ADD CONSTRAINT "FK_7a0df7028ab735331618a439bb2" FOREIGN KEY ("managerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "restaurant" DROP CONSTRAINT "FK_7a0df7028ab735331618a439bb2"`,
    )
    await queryRunner.query(
      `ALTER TABLE "restaurant" DROP CONSTRAINT "UQ_7a0df7028ab735331618a439bb2"`,
    )
    await queryRunner.query(`ALTER TABLE "restaurant" DROP COLUMN "managerId"`)
  }
}
