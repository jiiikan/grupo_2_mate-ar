const express = require("express");
const path = require("path");
const fs = require("fs");
const { validationResult } = require("express-validator");

// Requerir al a basde de datos
/*let readFile = fs.readFileSync(path.resolve(__dirname, "../data/products.json"))
let products = JSON.parse(readFile, "utf-8");*/
const db = require('../database/models');
const { Association } = require("sequelize");

const productsController = {
    // Renderizar lista de productos
    catalogo:  (req, res) => {
        db.Producto.findAll()
        
            .then(function(products){
                return res.render("products/catalogo", {products: products})
            })

    },

    // Detalle de productos dinamico
    detalle: async (req, res) => {
            const productoid = req.params.id;
            
            const product = await db.Producto.findByPk(productoid, {include: [{association: "categories"}]});

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

    //Formulario de crear producto
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
        image: req.file.filename,
        category_id: req.body.category_id
    });
    res.redirect("/")
    },

    // Renderizar pagina edicion
    edition: async (req, res) => {
    const categorias = db.Categoria.findAll()
    const product = await db.Producto.findByPk(req.query.id);

    if (isNaN(req.query.id)) {
        return res.status(404).render("error404");
    }

    if (!product) {
        return res.status(404).render("error404");
    }

    Promise.all([product, categorias])
        res.render("products/edition", { product: product, categorias:categorias });
},

    // Editar producto
    update: async (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = await db.Producto.findByPk(productId);

    if (productIndex == undefined) {
        return res.status(404).render("error404");
    };

    db.Producto.update({
        name: req.params.product,
        description: req.params.description,
        price: parseFloat(price),
        image: req.params.image,
        category_id: req.params.category,
    });

    res.redirect("/");
},
/*
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