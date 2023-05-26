const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require('../database/models');
const { validationResult } = require("express-validator");
const bcryptjs = require('bcryptjs');
const { log } = require("console");
const { on } = require("events");


let readFile = fs.readFileSync(path.resolve(__dirname, "../data/users.json"))
let users = JSON.parse(readFile, "utf-8");

const usersController = {   

    registro: (req, res) => {
        db.Usuario.findAll()
        .then(function (usuarios){
            res.render("users/registro", {usuarios})
        })
    
},

    registrado: (req, res) => {
        const resultValidation = validationResult(req);

    if(resultValidation.errors.length > 0){
        return res.render("users/registro", {
            errors: resultValidation.mapped(),
            oldData: req.body
    })
    }
    /*let dbcomp = db.Usuario.findAll()
    function dbcomp (field, text) {
        let userInDB = db.Usuario.find()
    }
    let userInDB =  User.findByField("email", req.body.email)

    if (userInDB){
        return res.render("users/registro", {
            errors: {
                email: {
                    msg: 'Este email ya esta registrado'
                }
            },
            oldData: req.body
        })
    }  */

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
        console.log(req.body)


		return res.redirect('/users/login');
	},
    login: (req, res) => {
        res.render("users/login", {user: users})
    },
    logeando: (req, res) => {
		let userEmail = db.Usuario.findByPk();

		if(userEmail) {
			let isOkThePassword = bcryptjs.compareSync(req.body.password, userEmail.password);
            if (isOkThePassword) { 
            delete userEmail.password;
			req.session.userLogged = userEmail;

            if(req.body.remember) {
                res.cookie('userLogin', req.body.email, { maxAge: (1000 * 60) * 1000})
                //return ;
            }


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
		});/**/
        
	},
    profile: (req, res) => {
    const user =  req.session.userLogged
    const userFromDB = User.findByField('id', user.id);
    res.render('./users/perfil', { user: users });
},
        
    logout: (req, res) => {
        res.clearCookie('userLogin')
        req.session.destroy();
        return res.redirect('/');
}};

module.exports = usersController;