const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController.js");

router.get("/", productsController.index);
router.get("/detalle", productsController.detalle);
router.get("/catalogo", productsController.catalogo);
router.get("/editor", productsController.edition);

module.exports= router; 
