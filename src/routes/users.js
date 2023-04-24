const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController.js");
const multer = require("multer");

//utilizacion de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "./public/images/users")
    },
    filename: (req, file, cb) =>{
        let fileName = '${Date.now()}_img${path.extname(file.originalname)}';
        cb(null, fileName)
    }
})

const uploadFile = multer({ storage })

const validations = [
    /*body("product").notEmpty().withMessage("Tienes que ingresar el nombre del producto"),
    body("description").notEmpty().withMessage("Tienes que ingresarle una descripcion"),
    body("price").notEmpty().withMessage("Tienes que ingresar un precio"),
    body("imagen-producto").custom((value, { req }) => {
    let file = req.file 
     //let acceptedExtensions  = [".jpg", ".png", ".gif"] VARIABLE PARA ESPECIFICAR QUE TIPO DE IMAGEN QUEREMOS
    if (!file){
        throw new Error("Tienen que subir una imagen")
    }
    // else {
    //let fileExtension = path.extname(file.originalName)
    //if (!acceptedExtensions.includes(fileExtension)){
    // throw new Error("Las extensiones de archivo permitidas son ${acceptedExtensions.join(", ")}')
    //}}
    return true;
    }),
    body("category").notEmpty().withMessage("Tienes que ingresar una categoria")*/
]

// rutas como tal
router.get("/carrito", usersController.carrito);
router.get("/login", usersController.login);
router.get("/registro", usersController.registro);
//router.post('/register', uploadFile.single('avatar'), usersController.create);

module.exports = router;