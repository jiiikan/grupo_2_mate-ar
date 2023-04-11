const express = require("express");
const path = require("path");
const fs = require("fs");

let readFile = fs.readFileSync(path.resolve(__dirname, "../data/products.json"))
let products = JSON.parse(readFile, "utf-8");

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
}

};

module.exports = usersController;