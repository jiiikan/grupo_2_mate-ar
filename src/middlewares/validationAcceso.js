const path = require('path');
const { body } = require('express-validator');


const validationsAcceso = [
    body("email")
    .notEmpty().withMessage("Tienes que ingresar un email valido").bail()
    .isEmail().withMessage("Debes escribir un formato de correo valido"),
    body("password").notEmpty().withMessage("Tienes que ingresar una contraseña"),
]

module.exports = validationsAcceso