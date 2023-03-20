const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController.js");

router.get("/", productsController.home);
router.get("/detalle", productsController.detalle);
router.get("/catalogo", productsController.catalogo);
router.get("/editor", productsController.edition);

module.exports= router; 
