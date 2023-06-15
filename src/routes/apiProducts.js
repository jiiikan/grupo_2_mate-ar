const express = require("express");
const router = express.Router();

const apiProducts = require("../controllers/apiProducts");

router.get('/prueba', apiProducts.prueba);

module.exports = router;