const express = require("express");
const path = require("path");

let productsController = {
    index: (req,res) => {
        res.render("index");
    },
    catalogo: (req, res) => {
        res.render("./products/catalogo");
    },
    detalle: (req, res) => {
        res.render("./products/detalleProducto");
    },
    edition: (req, res) => {
        res.render("./products/editionProducts");
    }
};

module.exports = productsController;