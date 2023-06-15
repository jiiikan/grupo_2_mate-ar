const db = require('../database/models');
const op = db.sequelize.op;

module.exports = {
    prueba: (req, res) =>{
        db.Producto.findAll()
            .then(usuarios =>{
                return res.json(usuarios)
            })
    }
}