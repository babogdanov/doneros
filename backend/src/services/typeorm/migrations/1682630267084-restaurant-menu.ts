import { MigrationInterface, QueryRunner } from 'typeorm'

export class restaurantMenu1682630267084 implements MigrationInterface {
  name = 'restaurantMenu1682630267084'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "restaurant" (
        "id" SERIAL NOT NULL, 
        "created_at" TIMESTAMP NOT NULL DEFAULT NOW(), 
        "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(), 
        "name" character varying NOT NULL, 
        "description" character varying NOT NULL, 
        "address" character varying NOT NULL,  
        CONSTRAINT "PK_649e250d8b8165cb406d99aa30f" PRIMARY KEY ("id")
      )`,
    )
    await queryRunner.query(
      `CREATE TABLE "menu_item" (
        "id" SERIAL NOT NULL, 
        "created_at" TIMESTAMP NOT NULL DEFAULT NOW(), 
        "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(), 
        "name" character varying NOT NULL, 
        "description" character varying NOT NULL, 
        "pictureUrl" character varying NOT NULL, 
        "restaurantId" integer, 
        CONSTRAINT "PK_722c4de0accbbfafc77947a8556" PRIMARY KEY ("id")
      )`,
    )
    await queryRunner.query(
      `ALTER TABLE "menu_item" 
      ADD CONSTRAINT "FK_3cefe83c00b071077959f67e8e8" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "menu_item" DROP CONSTRAINT "FK_3cefe83c00b071077959f67e8e8"`,
    )
    await queryRunner.query(`DROP TABLE "menu_item"`)
    await queryRunner.query(`DROP TABLE "restaurant"`)
  }
}
