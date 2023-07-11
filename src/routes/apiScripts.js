const express = require("express");
const router = express.Router();

const apiScripts= require("../controllers/apiScripts");

router.get("/productos/:id", apiScripts.products);

module.exports = router;