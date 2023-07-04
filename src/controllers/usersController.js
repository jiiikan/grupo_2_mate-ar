const { validationResult } = require("express-validator");
const bcryptjs = require('bcryptjs');
const db = require('../database/models');
const { log, error } = require("console");
const { on } = require("events");
const Sequelize = require("sequelize");

const usersController = {
    // Registro de usuario GET
    registro: (req, res) => {
        res.render("users/registro", { ey: {} })

    },
    // Registro de usuario POST  
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
        res.render("users/login", {ey: {}})
    })
    .catch((error) => {
        console.log(error);
        res.status(400).render("error400");
      });
}

},
    

    // Incio de sesion GET 
    login: (req, res) => {
        res.render("users/login", {ey: {}})
    },

    // Inicio de sesion POST 
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

                        if (req.body.remember) {
                             res.cookie('remember', req.body.email, { maxAge: 6000 * 8 });

                        }
                        return res.redirect('/users/perfil');
}}
})
.catch((error) => {
    console.log(error);
    res.status(400).render("error400");
  });
    }
},

    // Renderizacion perfil
    profile: (req, res) => {
        //const user =  req.session.userLogged
        //const userFromDB = User.findByField('id', user.id);
        res.render('./users/perfil', {
            user: req.session.userLogged
        });
    },

    // Desloguearse
    logout: (req, res) => {
        res.clearCookie('remember')
        req.session.destroy();
        return res.redirect('/');
    },

    // Renderizacion carrito de compras
    carrito: (req, res) => {
        res.render("./users/carrito")
    },

};

module.exports = usersController;