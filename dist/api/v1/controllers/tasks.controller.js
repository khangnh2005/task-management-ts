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
exports.deleteTask = exports.edit = exports.create = exports.changeMulti = exports.changeStatus = exports.detail = exports.index = void 0;
const pagination_1 = __importDefault(require("../../../helpers/pagination"));
const search_1 = __importDefault(require("../../../helpers/search"));
const task_model_1 = __importDefault(require("../models/task.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const find = {
        deleted: false
    };
    if (req.query.status) {
        find.status = req.query.status.toString();
    }
    const sort = {};
    if (req.query.sortKey && req.query.sortValue) {
        const sortKey = req.query.sortKey.toString();
        sort[sortKey] = req.query.sortValue;
    }
    const countTasks = yield task_model_1.default.countDocuments(find);
    let objectPagination = (0, pagination_1.default)({
        currentPage: 1,
        limitItems: 3
    }, req.query, countTasks);
    const search = (0, search_1.default)(req.query);
    if (search.regex) {
        find.title = search.regex;
    }
    const tasks = yield task_model_1.default
        .find(find)
        .sort(sort)
        .skip(objectPagination.skip || 0)
        .limit(objectPagination.limitItems);
    res.json(tasks);
});
exports.index = index;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const task = yield task_model_1.default.findOne({ _id: id, deleted: false });
    res.json(task);
});
exports.detail = detail;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const status = req.body.status;
        const task = yield task_model_1.default.updateOne({ _id: id, deleted: false }, {
            status: status
        });
        if (!task) {
            res.json({
                code: 400,
                message: "Cap nhat trang thai khong thanh cong"
            });
        }
        res.json({
            code: 200,
            message: "Cap nhat trang thai thanh cong"
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            code: 400,
            message: "Loi"
        });
    }
});
exports.changeStatus = changeStatus;
const changeMulti = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ids = req.body.ids;
        const key = req.body.key;
        const value = req.body.value;
        switch (key) {
            case "status":
                yield task_model_1.default.updateMany({
                    _id: { $in: ids },
                }, {
                    status: value,
                });
            case "delete":
                yield task_model_1.default.updateMany({
                    _id: { $in: ids }
                }, {
                    deleted: true,
                    deletedAt: new Date()
                });
                break;
                res.json({
                    code: 200,
                    message: "Cập nhật trạng thái thành công!",
                });
                break;
            default:
                res.json({
                    code: 400,
                    message: "Không tồn tại!",
                });
                break;
        }
    }
    catch (error) {
        console.log(error);
        res.json({
            code: 400,
            message: "Loi"
        });
    }
});
exports.changeMulti = changeMulti;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = new task_model_1.default(req.body);
        const data = yield task.save();
        res.json({
            code: 200,
            message: "Tạo mới thành công",
            data: data
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Lỗi"
        });
    }
});
exports.create = create;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield task_model_1.default.updateOne({ _id: id }, req.body);
        const data = req.body;
        res.json({
            code: 200,
            message: "Chỉnh sửa thành công",
            data: data
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Lỗi"
        });
    }
});
exports.edit = edit;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield task_model_1.default.updateOne({ _id: id }, {
            deleted: true,
            deletedAt: new Date()
        });
        res.json({
            code: 200,
            message: "Đã xóa thành công",
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Lỗi"
        });
    }
});
exports.deleteTask = deleteTask;
