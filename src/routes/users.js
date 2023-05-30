const express = require('express');
const router = express.Router();


// Controller
const usersController = require('../controllers/usersController');

// Middlewares
const uploadFile = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validationRegisterMiddleware.js');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const validationsAcceso = require('../middlewares/validationAcceso');
const registerValidations = require("../middlewares/validationRegisterMiddleware")



router.get("/carrito", authMiddleware, usersController.carrito);
//router.post("/carrito", usersController.carritoPush);
//router.delete("/carrito", usersController.carritoDelete);

router.get("/registro", guestMiddleware, registerValidations ,usersController.registro);
router.post("/registro", uploadFile.single("avatar"), validations, usersController.registrado);

router.get("/login", guestMiddleware, usersController.login);
router.post('/login', validationsAcceso, usersController.logeando);

router.get('/perfil', authMiddleware ,usersController.profile);

router.get('/logout', usersController.logout);

module.exports = router;