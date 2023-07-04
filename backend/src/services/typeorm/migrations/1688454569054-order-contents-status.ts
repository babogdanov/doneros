import { MigrationInterface, QueryRunner } from 'typeorm'

export class orderContentsStatus1688454569054 implements MigrationInterface {
  name = 'orderContentsStatus1688454569054'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "order_menu_items_menu_item" ("orderId" integer NOT NULL, "menuItemId" integer NOT NULL, CONSTRAINT "PK_b2822e48e17399d7cad235bd61f" PRIMARY KEY ("orderId", "menuItemId"))`,
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_95bbd9b25e994f4d9291b75a16" ON "order_menu_items_menu_item" ("orderId") `,
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_ceaeb00984a31b6959abea031f" ON "order_menu_items_menu_item" ("menuItemId") `,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."order_status_enum" AS ENUM('created', 'in_progress', 'completed', 'rejected')`,
    )
    await queryRunner.query(
      `ALTER TABLE "order" ADD "status" "public"."order_status_enum" NOT NULL DEFAULT 'created'`,
    )
    await queryRunner.query(
      `ALTER TABLE "order_menu_items_menu_item" ADD CONSTRAINT "FK_95bbd9b25e994f4d9291b75a163" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE "order_menu_items_menu_item" ADD CONSTRAINT "FK_ceaeb00984a31b6959abea031f3" FOREIGN KEY ("menuItemId") REFERENCES "menu_item"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_menu_items_menu_item" DROP CONSTRAINT "FK_ceaeb00984a31b6959abea031f3"`,
    )
    await queryRunner.query(
      `ALTER TABLE "order_menu_items_menu_item" DROP CONSTRAINT "FK_95bbd9b25e994f4d9291b75a163"`,
    )
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "status"`)
    await queryRunner.query(`DROP TYPE "public"."order_status_enum"`)
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ceaeb00984a31b6959abea031f"`,
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_95bbd9b25e994f4d9291b75a16"`,
    )
    await queryRunner.query(`DROP TABLE "order_menu_items_menu_item"`)
  }
}
