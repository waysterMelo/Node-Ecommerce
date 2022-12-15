const express = require("express")
const router = express.Router();

const { create } = require("../controllers/userController")

router.post("/category/create", create)


module.exports = router;