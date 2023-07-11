const express = require('express');
const router = express.Router();


// Controller
const usersController = require('../controllers/usersController');

// Middlewares
const uploadFile = require('../middlewares/multerMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const validationsAcceso = require('../middlewares/validationAcceso');
const registerValidations = require("../middlewares/validationRegisterMiddleware")
const sessionMiddleware = require('../middlewares/sessionMiddleware');



router.get("/carrito", authMiddleware, usersController.carrito);
//router.post("/carrito", usersController.carritoPush);
//router.delete("/carrito", usersController.carritoDelete);


router.get("/registro",  registerValidations, guestMiddleware ,usersController.registro);
router.post("/registro", uploadFile.single("avatar"), registerValidations, sessionMiddleware, usersController.registrado);

router.get("/login",  validationsAcceso, guestMiddleware, usersController.login);
router.post('/login', validationsAcceso, sessionMiddleware, usersController.logeando);

router.get('/perfil', authMiddleware ,usersController.profile);

router.get('/logout', usersController.logout);

module.exports = router;