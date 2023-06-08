const db = require('../database/models');
const { validationResult } = require("express-validator");
const bcryptjs = require('bcryptjs');
const { log, error } = require("console");
const { on } = require("events");
const Sequelize = require("sequelize");

const usersController = {
    // Registro render 
    registro: (req, res) => {
        res.render("users/registro", { ey: {} })

    },
    // Registro  
    registrado: (req, res) => {
    const resultValidation = validationResult(req);
    
    if(resultValidation.errors.length > 0){
 res.render("users/registro", {errores: resultValidation.errors, ey: req.body})  

    } else {  
            db.Usuario.create({
            user_name: req.body.username,
            name_lastname: req.body.name_lastName,
            email: req.body.email,
            country: req.body.country,
            direction: req.body.direction,
            password: bcryptjs.hashSync(req.body.password, 10),
            avatar: req.file.filename,
            conditions: req.body.conditions

    })
    .then(function(){
        res.render("users/login")
    })
    .catch(function(error) {
        console.log(error)
        res.render("error", { message: "Error al crear ususario"})
    })
}

},
    

    // Login render 
    login: (req, res) => {
        res.render("users/login", { ey: {} })
    },

    // Login db  
    logeando: (req, res) => {
        const resultValidation = validationResult(req)
        if (resultValidation.errors.length > 0) {
            return res.render("users/login", { errores: resultValidation.errors, ey: req.body })
        }else{

        db.Usuario.findOne({
            where: { email: { [Sequelize.Op.eq]: req.body.email } }
        })
            .then((userEmail) => {

                if (userEmail) {
                    let isOkThePassword = bcryptjs.compareSync(req.body.password, userEmail.password);
                    if (isOkThePassword) {
                        delete userEmail.password;
                        req.session.userLogged = userEmail;
                        req.session.lastActitity = Date.now();
                        console.log(req.session)

                        if (req.body.remember) {
                            res.cookie('userLogin', userEmail.id, { maxAge: 1000 * 60 * 5 })
                            //return ;
                        }
                        return res.redirect('/users/perfil');
}}
})
            .catch(error => {
                console.log("error al iniciar sesion", error);
                return res.render("users/login")
            });
    }
},

    // Perfil render 
    profile: (req, res) => {
        //const user =  req.session.userLogged
        //const userFromDB = User.findByField('id', user.id);
        res.render('./users/perfil');
    },

    // Login con cookies 
    logout: (req, res) => {
        res.clearCookie('userLogin')
        req.session.destroy();
        return res.redirect('/');
    },
    carrito: (req, res) => {
        res.render("./users/carrito")
    },
    order: async function (req, res) {
        let order = await db.Order.findByPk(req.params.id, {
          include: db.Order.OrderItem,
        });
        // res.send(order);
        return res.render("order", { order });
      },

};

module.exports = usersController;