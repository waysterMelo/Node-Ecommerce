const express = require("express")
const router = express.Router();

const { create, categoryById, read, readAll, update, remove } = require("../controllers/categoryController")
const { isAdmin, isAuth,  requireSignin} = require("../controllers/auth")
const {userById } = require("../controllers/userController")

router.post("/category/create/:userId", create, requireSignin, isAuth, isAdmin);
router.get("/category/:categoryId", read);
router.get("/categories", readAll);
router.put("/category/:categoryId/:userId", update, requireSignin, isAuth, isAdmin);
router.delete("/category/:categoryId/:userId", remove, requireSignin, isAuth, isAdmin);


router.param("userId", userById);
router.param("categoryId", categoryById);


module.exports = router;