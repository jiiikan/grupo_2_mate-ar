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
        const productoid = req.params.id;
        
        const product = products.find(
            (product) => product.id === parseInt(productoid)
        );
    res.render("products/detalle", {product})
},

    edition: (req, res) => {
    res.render("products/editionProducts")
},

    create: (req, res) => {
    res.render("products/createProducts")
}

};


module.exports = productsController;