const express = require("express");
const path = require("path");

const usersController = {};

usersController.carrito = (req, res) => {
    res.render("users/carrito")
};
usersController.login = (req, res) => {
    res.render("users/login")
};
usersController.registro = (req, res) => {
    res.render("users/registro")
};

module.exports = usersController;