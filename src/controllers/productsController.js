const express = require("express");
const path = require("path");
const fs = require("fs");

let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/products.json")));

const productsController = {

    catalogo: (req, res) => {
    res.render("products/catalogo", {products: products})
},
    detalle: (req, res) => {
    res.render("products/detalleProducto")
},
    edition: (req, res) => {
    res.render("products/editionProducts")
},
    create: (req, res) => {
    res.render("products/createProducts")
}
};


module.exports = productsController;