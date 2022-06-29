const express = require("express")

const router = express.Router()

const authController = require("../controller/auth.controller")

router.get("/",authController.index)
//register
router.post("/register",authController.register)

// login
router.post("/login",authController.login)

module.exports = router