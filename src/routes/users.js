const express = require("express");
const router = express.Router();
const path = require("path");
const usersController = require("../controllers/usersController.js");
const multer = require("multer");
const { body } = require("express-validator");
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "./public/images/users")
    },
    filename: (req, file, cb) =>{
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null, fileName)
    }
})

const uploadFile = multer({ storage })

const validations = [
    body("nombre_usuario").notEmpty().withMessage("Tienes que crear un nombre de usuario"),
    body("nombre_apellido").notEmpty().withMessage("Tienes que ingresar tu nombre completo"),
    body("email").notEmpty().withMessage("Tienes que ingresar un email valido"),
    body("pais").notEmpty().withMessage("Tienes que ingresar el pais donde vives"),
    body("domicilio").notEmpty().withMessage("Tienes que ingresar un domicilio real"),
    body("contraseña").notEmpty().withMessage("Tienes que ingresar una contraseña"),
    body("confirmar_contraseña").notEmpty().withMessage("Ingrese devuelta la contraseña"),
    body("avatar").custom((value, { req }) => {
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
]


router.get("/carrito", usersController.carrito);
router.get("/login", usersController.login);
router.get("/registro", usersController.registro);
router.post("/registro", uploadFile.single("avatar"), validations, usersController.registrado)
//router.post('/register', uploadFile.single('avatar'), usersController.create);

module.exports = router;