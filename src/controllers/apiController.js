const db = require("../database/models");

module.exports = {
  product: async function (req, res) {
    let product = await db.Producto.findByPk(req.params.id);
    console.log(product)
    return res.json(product);
  },

};