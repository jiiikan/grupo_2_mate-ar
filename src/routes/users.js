const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController.js");


router.get("/carrito", usersController.carrito);
router.get("/login", usersController.login);
router.get("/registro", usersController.registro);
router.post('/register', uploadFile.single('avatar'), usersController.create);

module.exports = router;