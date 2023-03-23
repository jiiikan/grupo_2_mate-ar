const express = require("express");
const path = require("path");

const productsController = {

    catalogo: (req, res) => {
    res.render("products/catalogo")
},
    detalle: (req, res) => {
    res.render("products/detalleProducto")
},
    edition: (req, res) => {
    res.render("products/editionProducts")
},
    create: (req, res) => {
    res.render("products/createProducts")
}
};


module.exports = productsController;