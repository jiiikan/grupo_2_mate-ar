const express = require("express");
const router = express.Router();
const path = require("path");
const productsController = require("../controllers/productsController.js");
const multer = require("multer");
const { body } = require("express-validator");

//utilizacion de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "./public/images")
    },
    filename: (req, file, cb) =>{
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null, fileName)
    }
})
const uploadFile = multer({ storage })

// Middleware de validacion de productos
const validationProduct = require('../middlewares/validationProducts');

// Ruta de vista del catalogo
router.get("/catalogo", productsController.catalogo);
router.get("/catalogo/:id", productsController.catalogoId);


router.get("/detalle/:id", productsController.detalle);

// Rutas de creacion de un producto
router.get("/create",  uploadFile.single("image"), validationProduct, productsController.create);
router.post("/create",  uploadFile.single("image"), validationProduct,productsController.store);


// Rutas de edicion de los productos
router.get("/edition/:id", uploadFile.single("image"), validationProduct ,productsController.edition); 
router.post("/edition/:id",uploadFile.single("image"), validationProduct , productsController.update);

// Ruta de eliminacion de los productos
router.get("/delete/:id", productsController.delete);

module.exports= router; 
