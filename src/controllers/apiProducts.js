const { name } = require('ejs');
const db = require('../database/models');
const op = db.sequelize.op;

module.exports = {
    product: (req, res) =>{
        db.Producto.findAll({include: [{ 
            association: "categories",
        }]})
            .then(productos =>{
                productsByCategory = {}
                productos.forEach(product => {
                    const categories = product.categories;
                    if (Array.isArray(categories)) {
                        categories.forEach(category => {
                            const categoryName = category.name;
                            if (!productsByCategory[categoryName]) {
                                productsByCategory[categoryName] = 1;
                            } else {
                                productsByCategory[categoryName]++;
                            }
                        });
                    } else {
                        const categoryName = categories.name;
                        if (!productsByCategory[categoryName]) {
                            productsByCategory[categoryName] = 1;
                        } else {
                            productsByCategory[categoryName]++;
                        }
                    }
                });
                return res.status(200).json({
                    count:productos.length,
                    status: 200,
                    countByCategory: productsByCategory,
                    products: productos.map(product => ({
                        id: product.id,
                        name: product.name,
                        description: product.description,
                        categories: product.categories.name,
                        image: `http://localhost:3008/images/${product.image}`,
                        detail: `http://localhost:3008/api/products/${product.id}`
                    }))
                })
            })
    },

    detalle: (req,res) =>{
        db.Producto.findByPk(req.params.id, {include: [{ 
            association: "categories",
        }]})
            .then(producto =>{
                return res.status(200).json({
                    id: producto.id,
                    name: producto.name,
                    description: producto.description,
                    price: producto.price,
                    category_id: producto.categories.name,
                    image: `http://localhost:3008/images/${producto.image}`,
                })
            })

            
    },

    products: async function (req, res) {
        let product = await db.Producto.findByPk(req.params.id);
        console.log(product)
        return res.json(product);
    },

}