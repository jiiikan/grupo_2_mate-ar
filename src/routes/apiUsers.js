const express = require("express");
const router = express.Router();

const apiUsers = require("../controllers/apiUsers");

router.get("/users", apiUsers.users);
router.get('/users/:id', apiUsers.detalle)

module.exports = router;