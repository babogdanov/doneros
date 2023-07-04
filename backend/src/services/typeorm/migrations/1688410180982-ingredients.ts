import { MigrationInterface, QueryRunner } from 'typeorm'

export class ingredients1688410180982 implements MigrationInterface {
  name = 'ingredients1688410180982'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "ingredient" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(), "name" character varying NOT NULL, "quantity" numeric NOT NULL DEFAULT '0', "restaurantId" integer, CONSTRAINT "PK_6f1e945604a0b59f56a57570e98" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "ingredient" ADD CONSTRAINT "FK_67303879c5cc3143bd3c012ade7" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ingredient" DROP CONSTRAINT "FK_67303879c5cc3143bd3c012ade7"`,
    )
    await queryRunner.query(`DROP TABLE "ingredient"`)
  }
}
