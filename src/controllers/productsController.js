const express = require("express");
const path = require("path");

let productsController = {
    home: (req,res) => {
        res.sendFile(path.resolve(__dirname, "../views/home.html"));
    },
    catalogo: (req, res) => {
        res.sendFile(path.resolve(__dirname, "../views/products/catalogo.html"));
    },
    detalle: (req, res) => {
        res.sendFile(path.resolve(__dirname, "../views/products/detalleProducto.html"));
    },
    edition: (req, res) => {
        res.sendFile(path.resolve(__dirname, "../views/products/editionProducts.html"))
    }
};

module.exports = productsController;