import {Router } from"express";
const router : Router = Router()
import * as Controller from "../controllers/tasks.controller.js"
router.get("/", Controller.index);
router.get("/detail/:id", Controller.detail)
router.patch("/change-status/:id", Controller.changeStatus)
router.patch("/change-multi", Controller.changeMulti)
router.post('/create/',Controller.create)

export const taskRouter : Router = router