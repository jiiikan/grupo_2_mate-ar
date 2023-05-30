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

const productsValidations = require("../middlewares/validationProducts")



// RUTAS 
router.get("/catalogo", productsController.catalogo);
/*
router.get("/carrito", productsController.carrito);
router.post("/carrito", productsController.carritoAgregar);
*/
router.get('/carrito/:id/eliminar', productsController.carritoEliminar);

router.get("/create", productsController.create);
router.post("/create", productsValidations ,uploadFile.single("image"),productsController.store);

router.get("/detalle/:id", productsController.detalle);

router.get("/edition", productsController.edition);/*
router.post("/update/:id", productsController.update);
*/
router.get("/edition", productsController.edition); 
router.post("/update/:id", productsValidations, uploadFile.single("image"), productsController.update);

router.get("/delete/:id", productsController.delete);


/*
router.get("/carrito", productsController.carrito);
router.post("/carrito", productsController.agregarCart);
router.get('/carrito/:id/eliminar', productsController.carritoEliminar);
*/

module.exports= router; 
