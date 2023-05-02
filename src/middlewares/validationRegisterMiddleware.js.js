const path = require('path');
const { body } = require('express-validator');


const validations = [
    body("nombre_usuario").notEmpty().withMessage("Tienes que crear un nombre de usuario"),
    body("nombre_apellido").notEmpty().withMessage("Tienes que ingresar tu nombre completo"),
    body("email").isEmail().withMessage("Tienes que ingresar un email valido"),
    body("pais").notEmpty().withMessage("Tienes que ingresar el pais donde vives"),
    body("domicilio").notEmpty().withMessage("Tienes que ingresar un domicilio real"),
    body("contraseña").isLength({min: 8}).withMessage("Tienes que ingresar una contraseña"),
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

module.exports = validations