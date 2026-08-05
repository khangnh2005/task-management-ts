
import express, { Router } from "express";
import * as userController from "../controllers/users.controller";
const router : Router =Router()
router.post("/register" , userController.register)
router.post("/login" , userController.login)
router.get("/detail/:id" , 
    // authMiddleware.requireAuth,
     userController.detail
)

export const userRouter : Router = router