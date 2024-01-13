/*
  Warnings:

  - The values [DEVELOPER] on the enum `Roles` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `avatar_url` on the `Accounts` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Accounts` table. All the data in the column will be lost.
  - Added the required column `first_name` to the `Accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `Accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Roles_new" AS ENUM ('USER', 'ADMIN');
ALTER TABLE "Accounts" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "Accounts" ALTER COLUMN "role" TYPE "Roles_new" USING ("role"::text::"Roles_new");
ALTER TYPE "Roles" RENAME TO "Roles_old";
ALTER TYPE "Roles_new" RENAME TO "Roles";
DROP TYPE "Roles_old";
ALTER TABLE "Accounts" ALTER COLUMN "role" SET DEFAULT 'USER';
COMMIT;

-- DropIndex
DROP INDEX "Accounts_username_key";

-- AlterTable
ALTER TABLE "Accounts" DROP COLUMN "avatar_url",
DROP COLUMN "username",
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL;
