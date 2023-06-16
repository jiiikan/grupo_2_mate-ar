const db = require('../database/models');
const op = db.sequelize.op;

module.exports = {
    product: (req, res) =>{
        db.Producto.findAll()
            .then(productos =>{
                return res.status(200).json({
                    count:productos.length,
                    status: 200,
                    countByCategory: db.Categoria.findAll()
                        .then(categoria =>{
                            return res.json({
                                data: categoria
                            })
                        }),
                    products: productos.map(product => ({
                        id: product.id,
                        name: product.name,
                        description: product.description,
                        detail: `http://localhost:3000/api/products/${product.id}`
                    }))
                })
            })
    },

    detalle: (req,res) =>{
        db.Producto.findByPk(req.params.id)
            .then(producto =>{
                return res.status(200).json({
                    id: producto.id,
                    name: producto.name,
                    description: producto.description,
                    price: producto.price,
                    category_id: producto.category_id,
                    image: `http://localhost:3000/images/${producto.image}`,
                })
            })
    }
}