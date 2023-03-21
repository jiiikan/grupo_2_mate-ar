const express = require("express");
const path = require("path");

let usersController = {
    login: (req,res) => {
        res.render("./users/login");
    },
    registro: (req, res) => {
        res.render("./users/registro");
    },
    carrito: (req, res) => {
        res.render("./users/carrito");
    },
};

module.exports = usersController;