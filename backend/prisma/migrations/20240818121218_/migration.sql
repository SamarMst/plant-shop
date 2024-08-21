/*
  Warnings:

  - You are about to drop the column `prix` on the `Plant` table. All the data in the column will be lost.
  - You are about to drop the column `qte` on the `Plant` table. All the data in the column will be lost.
  - Added the required column `price` to the `Plant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Plant` DROP COLUMN `prix`,
    DROP COLUMN `qte`,
    ADD COLUMN `plantCategoryId` INTEGER NULL,
    ADD COLUMN `price` DOUBLE NOT NULL,
    ADD COLUMN `quantity` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `userImage` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `UserInfo` (
    `name` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `UserInfo_userId_key`(`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlantCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `PlantCategory_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserInfo` ADD CONSTRAINT `UserInfo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Plant` ADD CONSTRAINT `Plant_plantCategoryId_fkey` FOREIGN KEY (`plantCategoryId`) REFERENCES `PlantCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
