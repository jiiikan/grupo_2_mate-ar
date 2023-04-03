const express = require("express");
const path = require("path");
const fs = require("fs");

let readFile = fs.readFileSync(path.resolve(__dirname, "../data/products.json"))
let products = JSON.parse(readFile, "utf-8");

const productsController = {

    catalogo: (req, res) => {
    res.render("products/catalogo", {products: products})
},

    detalle: (req, res) => {
        const iD = req.params.id;
        
        const product = products.find(
            (product) => product.id === parseInt(iD)
        );

    res.render("products/detalleProducto", {})
},

    edition: (req, res) => {
    res.render("products/editionProducts")
},

    create: (req, res) => {
    res.render("products/createProducts")
}

};


module.exports = productsController;