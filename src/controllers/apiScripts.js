const { name } = require('ejs');
const db = require('../database/models');
const op = db.sequelize.op;

module.exports = {

    products: async function (req, res) {
        let product = await db.Producto.findByPk(req.params.id);
        return res.json(product);
      },

}