const express = require("express")
const { sign } = require("jsonwebtoken")
const router = express.Router()

const { signup, signin, signout, requireSignin } = require("../controllers/auth")
const { userSignupValidator } = require("../validator/index")
 
router.post("/signup", signup, userSignupValidator);
router.post("/signin", signin, requireSignin);
router.get("/signout", signout);


module.exports = router;