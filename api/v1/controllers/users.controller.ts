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

export const login = async (req : Request , res : Response)=>{
    try {
        
        const password = md5(req.body.password)
        const existUser = await User.findOne({
            email : req.body.email , 
            password : password,
            deleted : false  
        })
        if(!existUser){
            
            res.json({
                code: 400,
                message : "Email hoặc mật khẩu không đúng"
            })
            return ;
        }else{
            const token = existUser.token
            res.cookie("token", token)
            res.json({
                code: 200,
                message : "Đăng nhập thành công",
                token : token
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            code: 400,
            message : "Lỗi",
            error : error
        })
    }
}
export const detail = async (req : Request , res : Response)=>{
    try {
        res.json({
            code: 200,
            message : "Thanh cong", 
            info : (req as any).user 
        })
    } catch (error) {
        console.log(error)
        res.json({
            code: 400,
            message : "Lỗi"
        })
    }
}