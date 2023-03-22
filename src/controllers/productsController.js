const express = require("express");
const path = require("path");

const productsController = {};

productsController.catalogo = (req, res) => {
    res.render("products/catalogo")
};
productsController.detalle = (req, res) => {
    res.render("products/detalleProducto")
};
productsController.edition = (req, res) => {
    res.render("products/editionProducts")
};
productsController.create = (req, res) => {
    res.render("products/createProducts")
};

module.exports = productsController;