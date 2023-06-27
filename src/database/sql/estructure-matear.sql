DROP DATABASE IF EXISTS `matear`;
CREATE DATABASE `matear`;
USE `matear`;

CREATE TABLE `categories`(
    `id` INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL
);

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'mate'),
(2, 'termo'),
(3, 'bombilla'),
(4, 'kit de mate'),
(5, 'yerbas');


CREATE TABLE `products`(
    `id` INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `price` INT NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `category_id` INT UNSIGNED NOT NULL,
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL,
    `deleteAt` DATETIME NULL,
    FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`)
);

iNSERT INTO `products` (`id`, `name`, `description`, `price`, `image`, `category_id`) VALUES
(1, 'Mate madera', 'Mate de madera forrado de cuero negro artesanal con detalles', 3400, 'matee.jpg', 1),
(2, 'Mate de cuero ', 'Mate de madera lustrado detalle tallado en metal dorado', 4800, 'mate-2.jpg', 1),
(3, 'Termo 1l', 'Termo 1l color gris', 4300, 'termo.jpg', 2),
(4, 'Termo 1,5l', 'Termo 1,5l color gris ', 6000, 'termo2.jpg', 2),
(5, 'Bombilla plana', 'Bombilla punta plana ', 2000, 'bombilla.jpg', 3),
(6, 'Bombilla recta', 'Bombilla con resorte ', 2600, 'BOMBILLAS3.jpg', 3),
(7, 'Kit de cuero azul', 'Set de mate completo de color azul incluye yerbera y azucarera', 7500, 'kitcompleto1.jpg', 4),
(8, 'Kit de cuero negro', 'Set de mate de cuero negro incluye solo un accesorio de màs', 8700, 'set completo3.jpg', 4),
(9, 'kit completo cuero', 'Set artesanal completo  de cuero negro reforsado  incluye azucarera y yerbera', 7300, 'set-completo2.jpg', 4),
(10, 'Yerba cBSe', 'Una yerba de muy alta calidad para tus mates', 2300, 'cBSe.jpg', 5),
(11, 'Yerba playadito', 'Una yerba de muy alta calidad para tus mates', 2400, 'playadito.jpg', 5),
(12, 'Yerba verde flor', 'Una yerba de muy alta calidad para tus mates', 2500, 'verdeFLor.jpg', 5);



CREATE TABLE `users`(
    `id` INT UNSIGNED  PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(255) NOT NULL,
    `name_lastName` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `country` VARCHAR(255) NOT NULL,
    `direction` VARCHAR(255) NOT NULL,
    `avatar` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `conditions` TINYINT(1) NOT NULL,
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL,
    `deleteAt` DATETIME NULL
);

INSERT INTO `users` (`id`, `user_name`, `name_lastName`, `email`, `country`, `direction`, `avatar`, `password`, `conditions`) VALUES
(1, 'jiiikan', 'genaro rafault', 'genarorafault@gmail.com', 'Argentina', '17 de mayo', '1682612299196_img.jpg', '$2a$10$Gfh8UxSlzaStzvi.wtf8geTgv4JvxMLqYsVEmuAM28s9qgBgd2m8u', 1),
(2, 'nahhh', 'nahh bd funca', 'nahhh@gmail.com', 'Argentina', 'rio grande 1111', '1685369342015_img.jpg', '$2a$10$1wiTfl7ZBx5iLVx4VhMuZO0Q1k/i.6m0Q.3QugCweljvqNIhc7U3G', 1),
(3, 'ferPalacios', 'fernando lepe', 'ferchulepe05@gmail.com', 'Argentina', 'avenida san martin 453', '1687872603120_img.jpg', '$2a$10$/MLuGp/vuqgVb8ON6uLeuelXF8YbJQfgPcKrkuupJfLuyuLPfeF4q', 1),
(4, 'DannteS', 'Dante Stigliani', 'dantestigliani05@gmail.com', 'Argentina', 'avenida san martin 453', '1687873290727_img.jpg', '$2a$10$5D/vt6NUOFsxAJRyy5BideH8v3hMcqO9BD6PCDW8wym3H/yjs/JnK', 1),
(5, 'lolito23', 'Lolito Fernandez', 'lolitouwuxd3@gmail.com', 'Colombia', 'san martin 225', '1687873692676_img.jpg', '$2a$10$rdbixxReZqcMkCRkmXtsV.D16bg85AkbTgI.bZAe6Yni.DlCyuFAi', 1);

CREATE TABLE `orders`(
    `id` INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `total` INT NOT NULL,
    `userId` INT UNSIGNED NOT NULL ,
    `paymentMethod` VARCHAR(255) NOT NULL,
    `shippingMethod` VARCHAR(255),
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL,
    `deleteAt` DATETIME NULL,
    FOREIGN KEY (`userId`) REFERENCES `users`(`id`)
);

CREATE TABLE `orderitems`(
    `id` INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `price` DECIMAL(3,1) NOT NULL,
    `quantity` INT NOT NULL,
    `orderId` INT UNSIGNED NOT NULL,
    `productId` INT UNSIGNED,
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL,
    `deleteAt` DATETIME NULL,
    FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`),
    FOREIGN KEY (`productId`) REFERENCES `products` (`id`)
);