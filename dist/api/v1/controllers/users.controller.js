"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detail = exports.login = exports.register = void 0;
const md5_1 = __importDefault(require("md5"));
const users_model_1 = __importDefault(require("../models/users.model"));
const generateRDString_1 = require("../../../helpers/generateRDString");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body.password = (0, md5_1.default)(req.body.password);
        const existEmail = yield users_model_1.default.findOne({
            email: req.body.email,
            deleted: false
        });
        if (existEmail) {
            res.json({
                code: 400,
                message: "Email này đã được đăng ký"
            });
            return;
        }
        else {
            const user = new users_model_1.default({
                fullName: req.body.fullName,
                email: req.body.email,
                password: req.body.password,
                token: (0, generateRDString_1.generateRandomString)(30)
            });
            yield user.save();
            const token = user.token;
            res.cookie("token", token);
            res.json({
                code: 200,
                message: "Đăng ký thành công",
                token: token
            });
        }
    }
    catch (error) {
        console.log(error);
        res.json({
            code: 400,
            message: "Lỗi"
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const password = (0, md5_1.default)(req.body.password);
        const existUser = yield users_model_1.default.findOne({
            email: req.body.email,
            password: password,
            deleted: false
        });
        if (!existUser) {
            res.json({
                code: 400,
                message: "Email hoặc mật khẩu không đúng"
            });
            return;
        }
        else {
            const token = existUser.token;
            res.cookie("token", token);
            res.json({
                code: 200,
                message: "Đăng nhập thành công",
                token: token
            });
        }
    }
    catch (error) {
        console.log(error);
        res.json({
            code: 400,
            message: "Lỗi",
            error: error
        });
    }
});
exports.login = login;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({
            code: 200,
            message: "Thanh cong",
            info: req.user
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            code: 400,
            message: "Lỗi"
        });
    }
});
exports.detail = detail;
