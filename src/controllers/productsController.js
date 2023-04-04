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
        const productId = parseInt(req.query.id);
    if (isNaN(productId)) {
        res.status(404).send("Producto no encontrado");
        return;
    }
    const product = products.find((product) => product.id === productId);
    if (!product) {
        res.status(404).send("Producto no encontrado");
        return;
    }
    res.render("products/editionProducts.ejs", { product: product });
},


update: (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex((product) => product.id === productId);
    if (productIndex === -1) {
    res.status(404).send("Producto no encontrado");
    return;
    }
    const { id, product, description, price, image, category } = req.body;
    products[productIndex] = {
    id: productId,
    nombre: product,
    descripcion: description,
    precio: parseFloat(price),
    imagen: image,
    categoria: category,
    };
    res.redirect("/products/catalogo");
    
},
    create: (req, res) => {
    res.render("products/createProducts")       
},
    store: (req, res) => {
    const {product, description, price, image, category } = req.body;
    const newProduct = {
        id: products.length + 1,
        nombre: req.body.product,
        descripcion: req.body.description,
        precio: req.body.price,
        imagen: req.body.image,
        categoria: req.body.category
    };
    products.push(newProduct);
    res.redirect("/products/catalogo");
}

};


module.exports = productsController;