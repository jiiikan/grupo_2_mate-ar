const express = require("express");
const path = require("path");
const fs = require("fs");

let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/products.json")));

const productsController = {

    catalogo: (req, res) => {
    res.render("products/catalogo", {products: products})
},
    detalle: (req, res) => {
    const productId = req.query.id;
    const product = products.find((p) => p.id == productId);
    res.render("products/detalleProducto", { product });
},
    edition: (req, res) => {
    res.render("products/editionProducts")
},
    create: (req, res) => {
    res.render("products/createProducts")   
},
    store: (req, res) => {
    const { product, description, price, image, category } = req.body;
    const newProduct = {
        id: products.length + 1,
        nombre: product,
        descripcion: description,
        precio: presint(price),
        imagen: image,
        categoria: category
    };
    products.push(newProduct);
    fs.writeFileSync(path.resolve(__dirname, "../data/products.json"), JSON.stringify(products, null, 2), "utf-8");
    res.redirect("/catalogo");
}

};


module.exports = productsController;