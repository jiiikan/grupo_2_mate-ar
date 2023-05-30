const db = require('../database/models');
const { validationResult } = require("express-validator");
const bcryptjs = require('bcryptjs');
const { log, error } = require("console");
const { on } = require("events");
const Sequelize = require("sequelize");

const usersController = {
    // Registro render 
    registro: (req, res) => {
        res.render("users/registro")

    },
    // Registro  
    registrado: (req, res) => {
    const errores = validationResult(req);

    if(errores.isEmpty()){

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
            res.render('users/login');
        })  
    } else {  
  
        res.render("users/registro", {errores: validationResult.errors})
            
    }
    
},
    

    // Login render 
    login: (req, res) => {
        res.render("users/login")
    },

    // Login db  
    logeando: (req, res) => {
        const resultValidation = validationResult(req)
        if (!resultValidation.isEmpty()) {
            let errores = resultValidation.mapped();
            return res.render("users/login", { errores: errores, olds: req.body })
        }

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
                        console.log(req.session.userLogged)

                        if (req.body.remember) {
                            res.cookie('userLogin', req.body.email, { maxAge: (1000 * 60) * 1000 })
                            //return ;
                        }
                        return res.redirect('/users/perfil');
                    }

                    return res.render('users/login', {
                        errors: {
                            password: {
                                msg: 'La contraseña es incorrecta', olds: req.body
                            },
                        },

                    });
                }
                return res.render('users/login', {
                    errors: {
                        email: {
                            msg: 'El email es invalido', olds: req.body
                        },
                    },

                });

            }).catch(error => {
                console.log("error al iniciar sesion", error);
                return res.render("users/login")
            });

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