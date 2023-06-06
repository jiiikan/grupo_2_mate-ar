const path = require('path');
const { body } = require('express-validator');
const { where } = require('sequelize');


const validationProduct = [
    body("name")
    .notEmpty().withMessage("Tienes que ingresar el nombre del producto").bail()
    .isLength({ min: 5}).withMessage("Debe tener al menos 5 caracteres"),
    body("description").notEmpty().withMessage("Tienes que ingresarle una descripcion").bail()
    .isLength({ min: 10}).withMessage("Debe tener al menos 10 caracteres"),
    body("price").notEmpty().withMessage("Tienes que ingresar un precio"),
    body("image").custom((value, { req }) => {
    let file = req.file 
    let acceptedExtensions  = [".jpg", ".png", ".gif", "jpeg"] 
    if (!file){
        throw new Error("Tienes que subir una imagen")
    } else {
    let fileExtension = path.extname(file.originalname);  
    if (!acceptedExtensions.includes(fileExtension)){
    throw new Error (`Las extensiones de archivo permitidas son ${acceptedExtensions.join(", ")}`)
    }
}
    return true;
    })   
]

module.exports = validationProduct