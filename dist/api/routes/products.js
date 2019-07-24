"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-check
const express_1 = require("express");
const router = express_1.default.Router();
const multer_1 = require("multer");
const auth_vvv_1 = require("auth_vvv");
const products_1 = require("../controllers/products");
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, (new Date().getMilliseconds()) + file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    cb(null, true);
};
const upload = multer_1.default({ storage, limits: {
        fileSize: 1024 * 1024 * 5
    }, fileFilter: fileFilter });
router.route('/')
    .get(products_1.productAll)
    .post(auth_vvv_1.checkAuth, upload.single('productImage'), products_1.createProduct);
router.route('/:id')
    .get(products_1.getProduct)
    .patch(auth_vvv_1.checkAuth, products_1.updateProduct)
    .delete(auth_vvv_1.checkAuth, products_1.deleteProduct);
module.exports = router;
