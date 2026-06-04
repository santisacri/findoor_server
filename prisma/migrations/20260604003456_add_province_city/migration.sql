/*
  Warnings:

  - You are about to drop the column `city` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `lon` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `province` on the `addresses` table. All the data in the column will be lost.
  - Added the required column `city_id` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province_id` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "city",
DROP COLUMN "lon",
DROP COLUMN "province",
ADD COLUMN     "city_id" INTEGER NOT NULL,
ADD COLUMN     "lng" DOUBLE PRECISION,
ADD COLUMN     "province_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "provinces" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "provinces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cities" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "province_id" INTEGER NOT NULL,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "cities_province_id_idx" ON "cities"("province_id");

-- CreateIndex
CREATE INDEX "cities_name_idx" ON "cities"("name");

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "provinces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cities" ADD CONSTRAINT "cities_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "provinces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
