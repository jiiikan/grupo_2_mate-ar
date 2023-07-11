const express = require("express");
const router = express.Router();

const apiProducts = require("../controllers/apiProducts");

router.get('/products', apiProducts.product);
router.get('/products/:id', apiProducts.detalleApi);

module.exports = router;