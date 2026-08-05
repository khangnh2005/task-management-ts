import md5 from "md5"
import User from"../models/users.model"
import { Request, Response } from "express"
import {generateRandomString} from "../../../helpers/generateRDString"


export const register = async (req : Request , res : Response)=>{
    try {
        req.body.password  = md5(req.body.password)
        const existEmail = await User.findOne({
            email : req.body.email,
            deleted : false
        })
        if(existEmail){
            res.json({
                code: 400,
                message : "Email này đã được đăng ký"
            })
            return ;
        }else{
            const user = new User({
                fullName : req.body.fullName,
                email : req.body.email,
                password : req.body.password,
                token : generateRandomString(30)
            })
            await user.save();

            const token = user.token
            res.cookie("token", token)

            res.json({
                code: 200,
                message : "Đăng ký thành công",
                token : token
            })
        }
        
    } catch (error) {
        console.log(error)
        res.json({
            code: 400,
            message : "Lỗi"
        })
    }
}

