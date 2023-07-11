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
(3, 'Mate argentino', 'MAte con escudo de argentina', 5000, 'mate.jpg', 1),
(4, 'Mate de madera', 'Mate artesanal de madera de roble reforsado con metal antioxidante por dentro', 3000, 'mate3.jpeg', 1),
(5, 'Termo 1l', 'Termo 1l color gris', 4300, 'termo.jpg', 2),
(6, 'Termo 1,5l', 'Termo 1,5l color gris ', 6000, 'termo2.jpg', 2),
(7, 'Termo celeste', 'Termo de color celeste fluor', 6500, 'termo.jpg',2),
(9, 'Termo metalico', 'Mate de color negro', 8000, 'termo negro.jpg',2),
(10, 'Mate flauta', 'Bombilla de mate con 2 pelotitas', 2400, '30108D.jpg',3),
(11, 'Bombilla plana', 'Bombilla punta plana ', 2000, 'bombilla.jpg', 3),
(12, 'Bombilla recta', 'Bombilla con resorte ', 2600, 'BOMBILLAS3.jpg', 3),
(13, 'Bombilla de oro', 'Bombilla con el tono de color oro ', 2600, 'bomibilla_oro.png', 3),
(14, 'Kit de cuero azul', 'Set de mate completo de color azul incluye yerbera y azucarera', 7500, 'kitcompleto1.jpg', 4),
(15, 'Kit de cuero negro', 'Set de mate de cuero negro incluye solo un accesorio de màs', 8700, 'set completo3.jpg', 4),
(16, 'kit completo cuero', 'Set artesanal completo  de cuero negro reforsado  incluye azucarera y yerbera', 7300, 'set-completo2.jpg', 4),
(17, 'Juego de mate argentino', 'Mate edición mundial nueva, con 3 estrellas', 10000, 'juego de mater argentino.jpg',4),
(18, 'Yerba cBSe', 'Una yerba de muy alta calidad para tus mates', 2300, 'cBSe.jpg', 5),
(19, 'Yerba playadito', 'Una yerba de muy alta calidad para tus mates', 2400, 'playadito.jpg', 5),
(20, 'Yerba verde flor', 'Una yerba de muy alta calidad para tus mates', 2500, 'verdeFLor.jpg', 5),
(21, 'Yerba mañanita','Una yerba de alta calidad para tus mates', 5000, 'yerba mañanita.jpg',5);



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
(1, 'jiiikan', 'genaro rafault', 'genarorafault@gmail.com', 'Argentina', '17 de mayo', '1682612299196_img.jpg', '$2a$10$J1.KTvVJjPtbHtHeTnGmBenDRpW4Kik5n.AWMEwxnahg2.eQdSKRC', 1),
(2, 'nahhh', 'nahh bd funca', 'nahhh@gmail.com', 'Argentina', 'rio grande 1111', '1685369342015_img.jpg', '$2a$10$AK.zbVaRm..0uSAmoE9Amer4zopF3xp8AqqXHZdDRmdVnTXqWfJFq', 1),
(3, 'ferPalacios', 'fernando lepe', 'ferchulepe05@gmail.com', 'Argentina', 'avenida san martin 453', '1687872603120_img.jpg', '$2a$10$RoCuJlPCCRCTP8ev8oeXXUK5yR6EBa59RXNgv7G4QmHmEHfgfMFny', 1),
(4, 'DannteS', 'Dante Stigliani', 'dantestigliani05@gmail.com', 'Argentina', 'avenida san martin 453', '1687873290727_img.jpg', '$2a$10$5D/vt6NUOFsxAJRyy5BideH8v3hMcqO9BD6PCDW8wym3H/yjs/JnK', 1),
(5, 'lolito23', 'Lolito Fernandez', 'lolitouwuxd3@gmail.com', 'Colombia', 'san martin 225', '1687873692676_img.jpg', '$2a$10$rdbixxReZqcMkCRkmXtsV.D16bg85AkbTgI.bZAe6Yni.DlCyuFAi', 1);
