import { NextFunction, Request, Response } from "express"
import User from "../models/users.model"

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")
        const user = await User.findOne({
            token: token[1]
        }).select("-password")
        if (!user) {
            res.json({
                code: 400,
                message: "Vui long gui token hop le"
            })
            return
        }
        (req as any).user = user;
        next()
    }
    else {
        res.json({
            code: 400,
            message: "Vui long gui kem token"
        })
    }
}