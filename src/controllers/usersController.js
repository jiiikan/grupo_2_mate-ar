const express = require("express");
const path = require("path");

let usersController =  {
    login: (req, res ) => { 
        res.render("login");
    },
    registro: (req, res) => {
        res.render("registro");
    },
    carrito: (req , res) => {
        res.render( "carrito");
    },
};

module.exports = usersController;