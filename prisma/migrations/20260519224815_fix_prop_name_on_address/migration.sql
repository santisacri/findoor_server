/*
  Warnings:

  - You are about to drop the column `lng` on the `addresses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "lng",
ADD COLUMN     "lon" DOUBLE PRECISION;
