const path = require('path');
const { body } = require('express-validator');
const { where } = require('sequelize');

const validationProduct = [
    body("product").notEmpty().withMessage("Tienes que ingresar el nombre del producto"),
    body("description").notEmpty().withMessage("Tienes que ingresarle una descripcion"),
    body("price").notEmpty().withMessage("Tienes que ingresar un precio"),
    body("category_id").notEmpty().withMessage("Tienes que ingresar una categoria"),
    body("image").custom((value, { req }) => {
    let file = req.file 
    let acceptedExtensions  = [".jpg", ".png", ".gif", "jpeg"] 
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

module.exports = validationProduct