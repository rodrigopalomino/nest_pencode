-- CreateTable
CREATE TABLE `User` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(65) NOT NULL,
    `email` VARCHAR(65) NOT NULL,
    `username` VARCHAR(65) NOT NULL,
    `password` VARCHAR(65) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pen` (
    `pen_id` INTEGER NOT NULL AUTO_INCREMENT,
    `tittle` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `html` TEXT NOT NULL,
    `js` TEXT NOT NULL,
    `ccs` TEXT NOT NULL,
    `categories` VARCHAR(255) NOT NULL,
    `c_likes` INTEGER NOT NULL DEFAULT 0,
    `c_comennt` INTEGER NOT NULL DEFAULT 0,
    `c_views` INTEGER NOT NULL DEFAULT 0,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`pen_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comment` (
    `comment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `comment` TEXT NOT NULL,
    `user_id` INTEGER NOT NULL,
    `pen_id` INTEGER NOT NULL,

    PRIMARY KEY (`comment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Like` (
    `like_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `pen_id` INTEGER NOT NULL,

    PRIMARY KEY (`like_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pen` ADD CONSTRAINT `Pen_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_pen_id_fkey` FOREIGN KEY (`pen_id`) REFERENCES `Pen`(`pen_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_pen_id_fkey` FOREIGN KEY (`pen_id`) REFERENCES `Pen`(`pen_id`) ON DELETE CASCADE ON UPDATE CASCADE;
