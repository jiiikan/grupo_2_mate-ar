const express = require("express");
const path = require("path");
const fs = require("fs");
const { validationResult } = require("express-validator");

// Requerir al a basde de datos
/*let readFile = fs.readFileSync(path.resolve(__dirname, "../data/products.json"))
let products = JSON.parse(readFile, "utf-8");*/
const db = require('../database/models');

const productsController = {
    // Renderizar lista de productos
    catalogo:  (req, res) => {
        db.Producto.findAll()
            .then(function(products){
                return res.render("products/catalogo", {products: products})
            })
    },


    // Detalle de product dinamico
    detalle: async (req, res) => {
            const productoid = req.params.id;
            
            const product = await db.Producto.findByPk(productoid);

        if(product != null){
            res.render("products/detalle", {product})
        }else { 
            res.status(404).render('error404');
        };
    },


//Crear producto
    create:  (req, res) => {
        db.Categoria.findAll()
            .then(function(categorias) {
                return res.render("products/create", {categorias: categorias}) 
            })
},

store: (req, res) => {
    const resultValidation = validationResult(req);

    if(resultValidation.errors.length > 0){
        db.Categoria.findAll()
        .then(function(categorias) {
            return res.render("products/create", {categorias : categorias },  {
                errors: resultValidation.mapped(),
                olddata: req.body
            }) 
        })
    }

    db.Producto.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
        category_id: req.body.category_id
    });
    res.redirect("/")
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
        res.status(404).render("error404");
        return;
    }
    res.render("products/editionProducts.ejs", { product: product });
},

/*
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

    carrito: (req, res) => {
        res.render("products/carrito", { products, cart})
    },

*/
};


module.exports = productsController;