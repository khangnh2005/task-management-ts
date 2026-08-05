
import  { Router } from "express";
import * as userController from "../controllers/users.controller";
import * as authMiddleware from "../middlewares/auth.middleware"
const router : Router =Router()
router.post("/register" , userController.register)
router.post("/login" , userController.login)
router.get("/detail/" , 
    authMiddleware.requireAuth,
     userController.detail
)

export const userRouter : Router = router