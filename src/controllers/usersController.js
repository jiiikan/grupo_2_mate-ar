const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require('../database/models');
const { validationResult } = require("express-validator");
const bcryptjs = require('bcryptjs');
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

    let userInDB=  User.findByField("email", req.body.email)

    if (userInDB){

    if(resultValidation.errors.length > 0){
        return res.render("users/registro", {
            errors: {
                email: {
                    msg: 'Este email ya esta registrado'
                }
            },
            oldData: req.body
        })
    }  
}

        let userToCreate = {
			...req.body,
			password: bcryptjs.hashSync(req.body.password, 10),
			avatar: req.file.filename
        }      
        let userCreated = User.create(userToCreate);

		return res.redirect('/users/login');
	},
    login: (req, res) => {
        res.render("users/login")
    },
    logeando: (req, res) => {
		let userEmail = User.findByField('email', req.body.email);
		
		if(userEmail) {
			let desencriptacion = bcryptjs.compareSync(req.body.password, userEmail.password);
			if (desencriptacion) {
				delete userEmail.password;
				req.session.userLogged = userEmail;

				return res.redirect('/users/perfil');
			} 
			return res.render('users/login', {
				errors: {
					email: {
						msg: 'Las credenciales son inválidas'
					}
				}
			});
		}

		return res.render('users/login', {
			errors: {
				email: {
					msg: 'No se encuentra este email en nuestra base de datos'
				}
			}
		});
	},
    profile: (req, res) => {
            const userId = req.params.id;
            
            const user = users.find(
                (user) => user.id === parseInt(userId)
            );
        res.render("users/perfil", {user})
    },

    logout: (req, res) => {
    }

};

module.exports = usersController;