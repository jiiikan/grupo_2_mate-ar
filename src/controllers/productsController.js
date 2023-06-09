const { validationResult } = require("express-validator");
const db = require('../database/models');
const { Association } = require("sequelize");

const productsController = {
    // Renderizar lista de productos
    catalogo: (req, res) => {
        db.Producto.findAll()
            .then(function (products) {
                return res.render("products/catalogo", { products: products })
            })
    },

    // Detalle de productos dinamico
    detalle: async (req, res) => {
        const productoid = req.params.id;
        const product = await db.Producto.findByPk(productoid, { include: [{ association: "categories" }] });

        if (product != null) {
            res.render("products/detalle", { product })
        } else {
            res.status(404).render('error404');
        };
    },


    //Crear producto
    create: (req, res) => {
        db.Categoria.findAll()
            .then(function (categorias) {
                return res.render("products/create", { categorias: categorias, ey: {} })
            })
    },

    //Formulario de crear producto
    store: (req, res) => {
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            db.Categoria.findAll()
                .then(function (categorias) {
                    
                    res.render("products/create", {errores: resultValidation.errors, ey: req.body, categorias: categorias})
                })

                
        }else{

        db.Producto.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: req.file.filename,
            category_id: req.body.category_id
        });

        res.redirect("/")

        .catch(function (err) {
            console.log(err);
            res.render("error", { message: "Error al crear el producto" });
        })

    }},

    // Renderizar pagina edicion
    edition: async (req, res) => {
        const categorias = await db.Categoria.findAll()
        const product = await db.Producto.findByPk(req.query.id);

        if (isNaN(req.query.id)) {
            return res.status(404).render("error404");
        }
        if (!product) {
            return res.status(404).render("error404");
        }

        Promise.all([product, categorias])
        res.render("products/edition", { product: product, categorias: categorias});
    },

    // Editar producto
    update: async (req, res) => {
        const productId = parseInt(req.params.id);
        const product = await db.Producto.findByPk(productId);                     
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            db.Categoria.findAll()
                .then(function (categorias) {
                    res.render("products/edition", {errores: resultValidation.errors, product: product, categorias: categorias}) 
                })
            }else{

        if (product == undefined) {
            return res.status(404).render("error404");
        }

        db.Producto.update({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: req.file.filename,
            category_id: req.body.category_id,
        }, {
            where: {
                id: req.params.id
            }
        });
        res.redirect("/");
    }},

    // Borrar producto
    delete: (req, res) => {
        const borrar = req.params.id;

        db.Producto.destroy({
            where: {
                id: borrar
            }
        })
        res.redirect("/");
    }
};

module.exports = productsController;