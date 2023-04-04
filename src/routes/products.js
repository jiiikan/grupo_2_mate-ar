const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController.js");

router.get("/catalogo", productsController.catalogo);

router.get("/create", productsController.create);
router.post("/create", productsController.store);

// router.get("/detalle", productsController.detalle); no sirve que este
router.get("/detalle/:id", productsController.detalle);

router.get("/edition", productsController.edition);
router.post("/update/:id", productsController.update);

module.exports= router; 
