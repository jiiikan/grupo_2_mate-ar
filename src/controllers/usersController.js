const express = require("express");
const path = require("path");

let usersController =  {
    login: (req,res ) => { 
        res.sendFile(path.resolve(__dirname, "../views/users/login.html"));
    },
    registro: (req, res) => {
        res.sendFile(path.resolve(__dirname, "../views/users/registro.html"));
    },
    carrito: (req , res) => {
        res.sendFile(path.resolve(__dirname, "../views/users/carrito.html"));
    },
};

module.exports = usersController;