const express = require("express")
const router = express.Router();

const { userById } = require("../controllers/userController")
const { requireSignin } = require("../controllers/auth")

router.param("userID", userById);

router.get("/secret/:userID", requireSignin, (req, res) =>{
    res.json({
        user: req.profile
    })
})

module.exports = router;