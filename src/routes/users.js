const express = require('express');
const router = express.Router();

// Controller
const usersController = require('../controllers/usersController');

// Middlewares
const uploadFile = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validationRegisterMiddleware.js');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');


router.get("/carrito", usersController.carrito);

router.get("/registro", guestMiddleware ,usersController.registro);
router.post("/registro", uploadFile.single("avatar"), validations, usersController.registrado)
//router.post('/register', uploadFile.single('avatar'), usersController.create);

router.get("/login", guestMiddleware, usersController.login);
router.post('/login', usersController.logeando);

router.get('/perfil', usersController.profile);

router.get('/logout', usersController.logout);

module.exports = router;