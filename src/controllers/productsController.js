const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require('../database/models');
const { validationResult } = require("express-validator");

let readFile = fs.readFileSync(path.resolve(__dirname, "../data/products.json"))
let products = JSON.parse(readFile, "utf-8");

const productsController = {

    lista: (req, res) => {
        db.Producto.findAll()
        .then(products =>{
            res.render('catalogo.ejs', {products: products})
            })
    },

    // Renderizar lista de productos

    catalogo: (req, res) => {
        res.render("products/catalogo", {products: products})
    },

// Detalle de product dinamico

detalle: (req, res) => {
        const productoid = req.params.id;
        
        const product = products.find(
            (product) => product.id === parseInt(productoid)
        );
    res.render("products/detalle", {product})

},

// Renderizar pagina editar producto

edition: (req, res) => {
        const productId = parseInt(req.query.id);
    if (isNaN(productId)) {
        res.status(404).render("error404");
        return;
    }
    const product = products.find((product) => product.id === productId);
    if (!product) {
        res.status(404).render("error404");//send("Producto no encontrado");
        return;
    }
    res.render("products/editionProducts.ejs", { product: product });
},

// Editar producto

update: (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex((product) => product.id === productId);
    if (productIndex === -1) {
    res.status(404).render("error404");
    return;
    }
    const { id, product, description, price, imagenproducto, category } = req.body;
    products[productIndex] = {
    id: productId,
    nombre: product,
    descripcion: description,
    precio: parseFloat(price),
    imagen: imagenproducto,
    categoria: category,
    };
    fs.writeFileSync(
        path.resolve(__dirname, "../data/products.json"),
        JSON.stringify(products, null, 2),
        "utf-8"
    );
    res.redirect("/products/catalogo");
    
},
    create: (req, res) => {
    res.render("products/create")       
},

//Crear producto

store: (req, res) => {
    const resultValidation = validationResult(req);

    if(resultValidation.errors.length > 0){
        return res.render("products/create", {
            errors: resultValidation.mapped(),
            olddata: req.body
        })
    }
    const { product, description, price, category } = req.body;
    const newProduct = {
        id: products.length + 1,
        nombre: req.body.product,
        descripcion: req.body.description,
        precio: req.body.price,
        imagen: req.file.filename,
        categoria: req.body.category
    };

    products.push(newProduct);
    fs.writeFileSync(
        path.resolve(__dirname, "../data/products.json"),
        JSON.stringify(products, null, 2),
        "utf-8");
    res.redirect("/products/catalogo");
},

// Borrar producto

delete: (req, res) => {
    const borrar = req.params.id;

    const productBorrar = products.filter(
        (producto) => producto.id != borrar
    );

    let productoGuardar = JSON.stringify(productBorrar, null, 2);
    fs.writeFileSync( path.resolve(__dirname, "../data/products.json"), productoGuardar );
    res.redirect("/");
    }
};


module.exports = productsController;