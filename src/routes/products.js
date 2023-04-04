const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController.js");

router.get("/catalogo", productsController.catalogo);
router.get("/create", productsController.create);
router.post("/create", productsController.store);
router.get("/detalle", productsController.detalle);
router.get("/detalle/:id", productsController.detalle);
router.get("/edition", productsController.edition);

module.exports= router; 
