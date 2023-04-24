const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require('../database/models');
const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const User = require('../modelos/User');

let readFile = fs.readFileSync(path.resolve(__dirname, "../data/users.json"))
let users = JSON.parse(readFile, "utf-8");

const usersController = {   
    carrito: (req, res) => {
        res.render("users/carrito")
        /*
        const productId = req.params.id;
        const product = products.find(p => p.id === parseInt(productId));
        if (product) {
        carrito.push(product);
        res.redirect('/carrito/add/:id');
        } else {
        res.status(404).send('Producto no encontrado');
        }*/

},
    registro: (req, res) => {
    res.render("users/registro")

},
    registrado: (req, res) => {
        const resultValidation = validationResult(req);

    if(resultValidation.errors.length > 0){
        return res.render("users/registro", {
            errors: resultValidation.mapped(),
            oldData: req.body
    })
    }


    /*let userInDB = User.findByField('email', req.body.email);

		if (userInDB) {
			return res.render('userRegisterForm', {
				errors: {
					email: {
						msg: 'Este email ya está registrado'
					}
				},
				oldData: req.body
			});
		}

        let userToCreate = {
			...req.body,
			password: bcryptjs.hashSync(req.body.password, 10),
			avatar: req.file.filename
        }
        let userCreated = User.create(userToCreate);

		return res.redirect('/users/login');*/
	},
    login: (req, res) => {
        res.render("users/login")
    },
    logeando: (req, res) => {
        let userToLogin = User.findByField("email", req.body.email);

        if(userToLogin) {
            let isOkThePassword = bcrypt.compareSync(req.body.password, userToLogin.password);
            if(isOkThePassword) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;

                if(req.session.remember_user) {
                    res.cookie("userEmail", req.body.email, { maxAge: (1000 * 60) * 60 })
                }
                return res.redirect("/user/profile");
            }
            return res.render("userLoginForm", {
                errors: {
                    email: {
                        msg: "Las credenciales son invalidas"
                        }
                    }
                });
        }
        return res.render("userLoginForm", {
            errors: {
                email: {
                    msg: "No se encuentra este email en nuestra base de datis"
                }
            }
        });
    },
    profile: (req, res) => {
        return res.render("userProfile", {
            user: req.session.userLogged
        })
    },
    logout: (req, res) => {
        res.clearCookie("userEmail")
        req.session.destroy()
        return res.redirect("/")
    }



};

module.exports = usersController;