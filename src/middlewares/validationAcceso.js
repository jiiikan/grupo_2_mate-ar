const path = require('path');
const { body } = require('express-validator');


const validationsAcceso = [
    body("user")
    .notEmpty().withMessage("Tienes que ingresar un email valido").bail()
    .isEmail().withMessage("Debes escribir un formato de correo valido"),
    body("contraseña").notEmpty().withMessage("Tienes que ingresar una contraseña"),
    //body("confirmar_contraseña").notEmpty().withMessage("Ingrese devuelta la contraseña"),
]

module.exports = validationsAcceso