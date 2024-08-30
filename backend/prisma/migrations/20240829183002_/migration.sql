/*
  Warnings:

  - You are about to drop the column `plantImage` on the `Plant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Plant` DROP COLUMN `plantImage`;

-- CreateTable
CREATE TABLE `Resources` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `filename` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `plantId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Resources` ADD CONSTRAINT `Resources_plantId_fkey` FOREIGN KEY (`plantId`) REFERENCES `Plant`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
