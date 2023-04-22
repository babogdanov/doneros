import { MigrationInterface, QueryRunner } from 'typeorm'

export class auth1680723636807 implements MigrationInterface {
  name = 'auth1680723636807'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "reset_token" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(), "token" character varying NOT NULL, "expiresAt" TIMESTAMP NOT NULL, "user_id" integer, CONSTRAINT "UQ_4765b68e90a8b2cf4b05a6a1c0d" UNIQUE ("token"), CONSTRAINT "REL_765e2b25e88f51c41139d83ff7" UNIQUE ("user_id"), CONSTRAINT "PK_93e1171b4a87d2d0478295f1a99" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "reset_token" ADD CONSTRAINT "FK_765e2b25e88f51c41139d83ff76" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reset_token" DROP CONSTRAINT "FK_765e2b25e88f51c41139d83ff76"`,
    )
    await queryRunner.query(`DROP TABLE "reset_token"`)
  }
}
