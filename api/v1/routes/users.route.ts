const express = require("express")
const router = express.Router()
const userController = require("../controller/users.controller")
const authMiddleware = require("../middlewares/auth.middleware")
router.post("/register" , userController.register)
router.post("/login" , userController.login)
router.post("/password/forgot" , userController.forgotPassword)
router.post("/password/otp" , userController.otpPassword)
router.post("/password/reset" , userController.resetPassword)
router.get("/detail/" , 
    authMiddleware.requireAuth,
     userController.detail
)
router.get("/list/" , 
    authMiddleware.requireAuth,
     userController.list
)


module.exports = router