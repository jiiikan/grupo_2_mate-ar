const path = require('path');
const { body } = require('express-validator');
const db = require('../database/models');
const bcrypt = require('bcryptjs');

const validationsAcceso = [
    body("email")
    .notEmpty().withMessage("Tienes que ingresar un email valido").bail()
    .isEmail().withMessage("Debes escribir un formato de correo valido").bail()
    .custom(async (value, {req}) => {
        const user = await db.Usuario.findOne(
            {where: { email: value } }
            ); 
        if(!user){
            throw new Error('El correo electrónico no está registrado');
        }
        return true;
    }),
    body("password").notEmpty().withMessage("Tienes que ingresar una contraseña").bail()
    .custom(async (value, { req }) => {
        const user = await db.Usuario.findOne({ where: { email: req.body.email } });
        if (!user) {
          throw new Error('Ingresa un correo electronico');
        }
        const passwordMatch = await bcrypt.compare(value, user.password);
        if (!passwordMatch) {
          throw new Error('La contraseña o el correo electronico es incorrecto');
        }
        return true;
      })
]

module.exports = validationsAcceso