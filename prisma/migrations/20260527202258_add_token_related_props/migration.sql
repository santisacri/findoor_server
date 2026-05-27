/*
  Warnings:

  - You are about to drop the column `is_validated` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "is_validated",
ADD COLUMN     "is_verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "verification_expires_at" TIMESTAMP(3),
ADD COLUMN     "verification_token" TEXT;
