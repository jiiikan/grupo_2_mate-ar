const db = require('../database/models');
const op = db.sequelize.op;

module.exports = {
    users: (req, res) =>{
        db.Usuario.findAll()
            .then(usuarios =>{
                return res.status(200).json({
                    count:usuarios.length,
                    status: 200,
                    users: usuarios.map(user => ({
                        id: user.id,
                        name: user.user_name,
                        email: user.email,
                        detail: `http://localhost:3000/api/users/${user.id}`
                    }))
                })
            })
    },

    detalle: (req,res) =>{
        db.Usuario.findByPk(req.params.id)
            .then(usuario =>{
                return res.status(200).json({
                    id: usuario.id,
                    user_name: usuario.user_name,
                    name: usuario.name_lastname,
                    email: usuario.email,
                    country: usuario.country,
                    direction: usuario.direction,
                    image: `http://localhost:3000/images/users/${usuario.avatar}`,
                })
            })
    }
}