DROP DATABASE IF EXISTS `matear`;
CREATE DATABASE `matear`;
USE `matear`;

CREATE TABLE `categories`(
    `id` INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL
);


CREATE TABLE `products`(
    `id` INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `price` INT NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `category_id` INT UNSIGNED NOT NULL,
    FOREIGN KEY(`category_id`) REFERENCES `categories`(`id`)
    
);
CREATE TABLE `users`(
    `id` INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `name_lastName` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `country` VARCHAR(255) NOT NULL,
    `direction` VARCHAR(255) NOT NULL,
    `avatar` VARCHAR(255) NOT NULL,
    `admin` TINYINT(1) NOT NULL,
    `password` VARCHAR(255) NOT NULL
);

CREATE TABLE `cart`(
    `id` INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `total` INT NOT NULL,
    `cantidad` INT NOT NULL,
    `nombre_user` VARCHAR(255) NOT NULL,

    FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)

);