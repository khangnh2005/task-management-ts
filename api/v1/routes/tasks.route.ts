import {Router } from"express";
const router : Router = Router()
import * as Controller from "../controllers/tasks.controller.js"
router.get("/", Controller.index);
router.get("/detail/:id", Controller.detail)
router.patch("/change-status/:id", Controller.changeStatus)

export const taskRouter : Router = router