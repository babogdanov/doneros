import {MigrationInterface, QueryRunner} from "typeorm";

export class menuItemsPrices1688161639771 implements MigrationInterface {
    name = 'menuItemsPrices1688161639771'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "menu_item" ADD "price" numeric(10,2) NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "menu_item" DROP COLUMN "price"`);
    }

}
