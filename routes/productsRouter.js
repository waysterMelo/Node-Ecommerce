const express = require("express")
const router = express.Router();

const { create, read, productById, remove, update } = require("../controllers/productController")
const { isAdmin, isAuth,  requireSignin} = require("../controllers/auth")
const {userById } = require("../controllers/userController")

router.post("/product/create/:userId", create, requireSignin, isAuth, isAdmin);
router.get("/product/:productId", read);
router.delete("/product/:productId/:userId", requireSignin, isAuth, isAdmin, remove);
router.put("/product/:productId/:userId", requireSignin, isAuth, isAdmin, update);

router.param("userId", userById);
router.param("productId", productById);


module.exports = router;