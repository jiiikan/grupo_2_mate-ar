const { validationResult } = require("express-validator");
const db = require('../database/models');
const { Association } = require("sequelize");

const productsController = {
    // Renderizacion de la lista de productos
    catalogo: (req, res) => {
        db.Producto.findAll()
            .then(function (products) {
                return res.render("products/catalogo", { products: products })
            })
    },

    catalogoId: (req, res) => {
        const { id } = req.params;
        db.Producto.findAll({
        include: [{ association: "categories" }],
          where: { category_id: id }
        })
          .then(products => {
            db.Categoria.findAll()
              .then(categories => {
                res.render('products/catalogo', { products: products, categories: categories });
              })
              .catch((error) => {
                console.log(error);
                res.status(400).render("error400");
              });
          })

    },

    // Detalle de un productos dinamico
    detalle: async (req, res) => {
        const productoid = req.params.id;
        const product = await db.Producto.findByPk(productoid, { include: [{ association: "categories" }] });

        if (product != null) {
            res.render("products/detalle", { product })
        } else {
            res.status(404).render('error404');
        };
    },


    //Creacion de un producto
    create: (req, res) => {
        db.Categoria.findAll()
            .then(function (categorias) {
                return res.render("products/create", { categorias: categorias, ey: {} })
            })
    },

    //Formulario de la creacion de un producto
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
        .catch((error) => {
          console.log(error);
          res.status(400).render("error400");
        });

    }},

    // Formulario de la edicion de un producto
    edition: (req, res) => {
       const productId = req.params.id

       const productoID = db.Producto.findByPk(productId)

       const categoriasAll = db.Categoria.findAll()
         
      Promise.all([productoID, categoriasAll])
      .then(function([product, categorias]) {
        res.render('products/edition', {product: product, categorias: categorias})
      })
      .catch((error) => {
        console.log(error);
        res.status(400).render("error400");
      });  
      },

    // Edicion del producto
    update: (req, res) => {
      const productId = parseInt(req.params.id);
      const productIndex = db.Producto.findByPk(productId);
      const resultValidation = validationResult(req);
      if (resultValidation.errors.length > 0) {
          db.Categoria.findAll()
              .then(function (categorias) {
                res.render("products/edition", {errores: resultValidation.errors, product: productIndex, categorias: categorias}) 
              })
          }else{
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
      

      

    // Eliminar el producto
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