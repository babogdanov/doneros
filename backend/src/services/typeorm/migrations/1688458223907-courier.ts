import { MigrationInterface, QueryRunner } from 'typeorm'

export class courier1688458223907 implements MigrationInterface {
  name = 'courier1688458223907'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "courier" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(), "email" character varying NOT NULL, "password" character varying NOT NULL, "phoneNumber" character varying NOT NULL DEFAULT '', CONSTRAINT "UQ_ecf3c30eeb2126e22d1cd68f219" UNIQUE ("email"), CONSTRAINT "PK_94613ec7dc72f7dfa2d072a31cf" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(`ALTER TABLE "order" ADD "courierId" integer`)
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_09a8dc00d5ffead302306720bc1" FOREIGN KEY ("courierId") REFERENCES "courier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_09a8dc00d5ffead302306720bc1"`,
    )
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "courierId"`)
    await queryRunner.query(`DROP TABLE "courier"`)
  }
}
