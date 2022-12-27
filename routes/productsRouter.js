const express = require("express")
const router = express.Router();

const { create, read, productById, remove,
update, readAll, list, listRelated, listCategories, listBySearch, photo } = require("../controllers/productController")

const { isAdmin, isAuth,  requireSignin} = require("../controllers/auth")
const {userById } = require("../controllers/userController")

router.post("/product/create/:userId", create, requireSignin, isAuth, isAdmin);
router.delete("/product/:productId/:userId", requireSignin, isAuth, isAdmin, remove);
router.put("/product/:productId/:userId", requireSignin, isAuth, isAdmin, update);
router.get("/products/:userId", requireSignin, isAuth, isAdmin, readAll);
router.get("/products", list);
router.get("/products/related/:productId", listRelated);
router.get("/product/categories", listCategories);
router.get("/products/by/search", listBySearch);
router.get("/product/photo/:productId", photo);
router.get("/product/:productId", read);



router.param("userId", userById);
router.param("productId", productById);


module.exports = router;