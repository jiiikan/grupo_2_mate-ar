const path = require('path');
const { body } = require('express-validator');


const validations = [
    body("username").notEmpty().withMessage("Tienes que escribir un nombre de usuario valido"),
    body("name_lastName").notEmpty().withMessage("Tienes que ingresar tu nombre completo"),
    body("email")
    .notEmpty().withMessage("Tienes que ingresar un email valido").bail()
    .isEmail().withMessage("Debes escribir un formato de correo valido"),
    body("country").notEmpty().withMessage("Tienes que ingresar el pais donde vives"),
    body("direction").notEmpty().withMessage("Tienes que ingresar un domicilio real"),
    body("password").notEmpty().withMessage("Tienes que ingresar una contraseña").bail()
    .isLength({ min: 8 }),
    //body("confirmar_contraseña").notEmpty().withMessage("Ingrese devuelta la contraseña"),
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

module.exports = validations;