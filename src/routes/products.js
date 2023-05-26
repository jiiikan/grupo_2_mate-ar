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

/*const validations = [
    body("product").notEmpty().withMessage("Tienes que ingresar el nombre del producto"),
    body("description").notEmpty().withMessage("Tienes que ingresarle una descripcion"),
    body("price").notEmpty().withMessage("Tienes que ingresar un precio"),
    body("category_id").notEmpty().withMessage("Tienes que ingresar una categoria"),
    body("image").custom((value, { req }) => {
    let file = req.file 
    let acceptedExtensions  = [".jpg", ".png", ".gif"] 
    if (!file){
        throw new Error("Tienen que subir una imagen")
    } else {
    let fileExtension = path.extname(file.originalname);  
    if (!acceptedExtensions.includes(fileExtension)){
    throw new Error (`Las extensiones de archivo permitidas son ${acceptedExtensions.join(", ")}`)
    }
}
    return true;
    })
    
]*/

// Rutas como tal
router.get("/catalogo", productsController.catalogo);
/*
router.get("/carrito", productsController.carrito);
router.post("/carrito", productsController.carritoAgregar);
//router.get('/carrito/:id/eliminar', productsController.carritoEliminar);
*/
router.get("/create", productsController.create);
router.post("/create", uploadFile.single("image"),productsController.store);

router.get("/detalle/:id", productsController.detalle);

router.get("/edition", productsController.edition); 
router.post("/update/:id", uploadFile.single("image"), productsController.update);
/*
router.get("/delete/:id", productsController.delete);
*/

module.exports= router; 
