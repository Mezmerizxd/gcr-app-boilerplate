-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('USER', 'DEVELOPER', 'ADMIN');

-- CreateTable
CREATE TABLE "Accounts" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "role" "Roles" NOT NULL DEFAULT 'USER',
    "avatar_url" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Accounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Accounts_username_key" ON "Accounts"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Accounts_email_key" ON "Accounts"("email");
