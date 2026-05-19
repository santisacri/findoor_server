/*
  Warnings:

  - You are about to drop the column `addressId` on the `properties` table. All the data in the column will be lost.
  - The `currency` column on the `properties` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('ARS', 'USD');

-- AlterTable
ALTER TABLE "properties" DROP COLUMN "addressId",
DROP COLUMN "currency",
ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT 'USD';
