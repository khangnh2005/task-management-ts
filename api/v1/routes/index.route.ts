import {taskRouter} from "./tasks.route"
import {userRouter} from "./users.route"
import { Express } from "express";
const mainV1Routes = (app : Express) : void=>{
    const version = "/api/v1"
    app.use(version + "/tasks" , taskRouter)
    app.use(version + "/users" , userRouter)
}

export default mainV1Routes;