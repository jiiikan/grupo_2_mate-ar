const express = require("express");
const path = require("path");

let productsController = {
    index: (req,res) => {
        res.render("index");
    },
    catalogo: (req, res) => {
        res.render("catalogo");
    },
    detalle: (req, res) => {
        res.render("detalleProducto");
    },
    edition: (req, res) => {
        res.render("editionProducts");
    }
};

module.exports = productsController;