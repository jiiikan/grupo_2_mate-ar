const path = require('path');
const { body } = require('express-validator');
const db = require('../database/models');
const { where } = require('sequelize');




const validationsRegister = [
    body("username")
    .notEmpty().withMessage("Debes de escribir un nombre de usuario valido"),
    body("name_lastName")
    .notEmpty().isLength({ min: 5 }).withMessage("Debes de ingresar tu nombre completo con almenos 5 caracteres"),
    body("email")
    .notEmpty().withMessage("Debes de ingresar un email valido").bail()
    .isEmail().withMessage("Debes escribir un formato de email valido").bail()
    .custom(async (value, {req}) => {
        const user = await db.Usuario.findOne(
            {where: { email: value } }
            ); 
        console.log(value)
        if(user){
            throw new Error('El correo electrónico ya está registrado');
        }
        return true;
    }),
    body("country")
    .notEmpty().withMessage("Debes de ingresar el pais donde vives"),
    body("direction")
    .notEmpty().withMessage("Debes de ingresar un domicilio real"),
    body("password")
    .trim().notEmpty().withMessage("Debes de ingresar una contraseña valida").bail()
    //.matches(/^ (?=.*\d) $/).withMessage("Debe contener almenos un numero").bail()
    //.matches(/^(?=.*[A-Z])$/).withMessage("Debe contener almenos una mayuscula").bail()
    .isLength({ min: 8 }).withMessage("Debe tener al menos 8 caracteres"),
    //body("confirmar_contraseña").notEmpty().withMessage("Ingrese devuelta la contraseña"),
    body("avatar").custom((value, { req }) => {
    let file = req.file
    let acceptedExtensions  = [".jpg", ".png", ".gif", ".jpeg"] 
    if (!file){
        throw new Error("Debes de subir una imagen")
    } else {
    let fileExtension = path.extname(file.originalname);  
    if (!acceptedExtensions.includes(fileExtension)){
    throw new Error (`Las extensiones de archivo permitidas son ${acceptedExtensions.join(", ")}`)
    }
}
    return true;
    })
]

module.exports = validationsRegister;