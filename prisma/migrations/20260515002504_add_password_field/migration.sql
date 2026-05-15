/*
  Warnings:

  - The `phone` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "password" TEXT NOT NULL,
DROP COLUMN "phone",
ADD COLUMN     "phone" INTEGER;
