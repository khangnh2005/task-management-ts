
import express, { Router } from "express";
import * as userController from "../controllers/users.controller";
const router : Router =Router()
router.post("/register" , userController.register)


export const userRouter : Router = router