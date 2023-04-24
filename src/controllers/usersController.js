const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require('../database/models');
const { validationResult } = require("express-validator");

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
    login: (req, res) => {
    res.render("users/login")
},
    registro: (req, res) => {
    res.render("users/registro")

},
    registrado: (req, res) => {
        const resultValidation = validationResult(req);

    if(resultValidation.errors.length > 0){
        return res.render("users/registro", {
            errors: resultValidation.mapped(),
            olddata: req.body
        })
    }
    const { nombre_user, nombre_apellido, email, pais, domicilio, admin, confirmar_contraseña, avatar } = req.body;
    const newUser = {
        id: users.length + 1,
        nombre_user: req.body.nombre_usuario,
        nombre_apellido: req.body.nombre_apellido,
        email: req.body.email,
        pais: req.body.pais,
        domicilio: req.body.domicilio,
        admin:req.body.permisos,
        contraseña: req.body.confirmar_contraseña,
        avatar: req.file.filename
    };

    users.push(newUser);
    fs.writeFileSync(
        path.resolve(__dirname, "../data/users.json"),
        JSON.stringify(users, null, 2),
        "utf-8");
    res.redirect("/users/login");
    }

};

module.exports = usersController;