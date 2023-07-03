import { MigrationInterface, QueryRunner } from 'typeorm'

export class userAddresses1688216910203 implements MigrationInterface {
  name = 'userAddresses1688216910203'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "address" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(), "city" character varying NOT NULL, "street" character varying NOT NULL, "number" integer NOT NULL, "postalCode" integer NOT NULL, "userId" integer, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "address" ADD CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "address" DROP CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3"`,
    )
    await queryRunner.query(`DROP TABLE "address"`)
  }
}
