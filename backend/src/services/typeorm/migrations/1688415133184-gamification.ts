import {MigrationInterface, QueryRunner} from "typeorm";

export class gamification1688415133184 implements MigrationInterface {
    name = 'gamification1688415133184'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_coupons" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(), "freeDelivery" integer NOT NULL, "tenPercentOff" integer NOT NULL, "twentyPercentOff" integer NOT NULL, "thirtyPercentOff" integer NOT NULL, "fiftyPercentOff" integer NOT NULL, CONSTRAINT "PK_b9e7272f1f73463f57827b601ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "level" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(), "name" character varying NOT NULL, "points" integer NOT NULL, CONSTRAINT "PK_d3f1a7a6f09f1c3144bacdc6bcc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "points" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "couponsId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_4553428bdf6b2f73a58ec67c1cd" UNIQUE ("couponsId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD "levelId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_4553428bdf6b2f73a58ec67c1cd" FOREIGN KEY ("couponsId") REFERENCES "user_coupons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_2735b8ee71c0fa7f68190fe61b5" FOREIGN KEY ("levelId") REFERENCES "level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_2735b8ee71c0fa7f68190fe61b5"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_4553428bdf6b2f73a58ec67c1cd"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "levelId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_4553428bdf6b2f73a58ec67c1cd"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "couponsId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "points"`);
        await queryRunner.query(`DROP TABLE "level"`);
        await queryRunner.query(`DROP TABLE "user_coupons"`);
    }

}
