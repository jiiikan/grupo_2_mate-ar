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
    edition: (req, res) => {
       const productId = req.params.id

       const productoID = db.Producto.findByPk(productId)

       const categoriasAll = db.Categoria.findAll()
         
      Promise.all([productoID, categoriasAll])
      .then(function([product, categorias]) {
        res.render('products/edition', {product: product, categorias: categorias})
      })
      .catch((error) => {
        console.log('Error al obtener producto y categorías:', error);
        res.status(400).render("error400");
      });
            
      },

    // Editar producto
    update: (req, res) => {
        const productId = parseInt(req.params.id);
      
        db.Producto.findByPk(productId)
          .then((foundProduct) => {
            product = foundProduct;
      
            const resultValidation = validationResult(req);
            if (resultValidation.errors.length > 0) {
              return db.Categoria.findAll();
            }
      
            return db.Producto.update(
              {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image: req.file.filename,
                category_id: req.body.category_id,
              },
              {
                where: {
                  id: productId,
                },
              }
            );
          })
          .then((updateResult) => {
            if (updateResult && updateResult.length > 0) {
              res.redirect("/products/detalle/" + req.params.id);
            } else {
              res.status(404).render("error404");
            }
          })
          .catch((error) => {
            console.log(error);
            res.status(400).render("error400");
          });
      },

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