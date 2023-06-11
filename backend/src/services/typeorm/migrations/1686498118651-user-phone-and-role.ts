import { MigrationInterface, QueryRunner } from 'typeorm'

export class userPhoneAndRole1686498118651 implements MigrationInterface {
  name = 'userPhoneAndRole1686498118651'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "phoneNumber" character varying NOT NULL DEFAULT ''`,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('user', 'courier', 'manager', 'admin')`,
    )
    await queryRunner.query(
      `ALTER TABLE "users" ADD "role" "public"."users_role_enum" NOT NULL DEFAULT 'user'`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`)
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`)
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phoneNumber"`)
  }
}
