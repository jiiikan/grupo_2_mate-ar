const express = require("express");
const path = require("path");

const usersController = {

    carrito: (req, res) => {
    res.render("users/carrito")
},
    login: (req, res) => {
    res.render("users/login")
},
    registro: (req, res) => {
    res.render("users/registro")
}

};

module.exports = usersController;