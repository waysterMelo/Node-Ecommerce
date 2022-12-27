const express = require("express")
const router = express.Router();

const { userById, read, update } = require("../controllers/userController")
const { requireSignin, isAuth } = require("../controllers/auth")

router.get("/secret/:userId", requireSignin, (req, res) =>{ res.json({  user: req.profile})})
router.put("/user/:userId", requireSignin, isAuth, update);
router.get("/user/:userId", requireSignin, isAuth, read);

router.param("userId", userById);

module.exports = router;