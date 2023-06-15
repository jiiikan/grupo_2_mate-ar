const db = require('../database/models');
const op = db.sequelize.op;

module.exports = {
    users: (req, res) =>{
        db.Usuario.findAll()
            .then(usuarios =>{
                return res.json(usuarios)
            })
    }
}