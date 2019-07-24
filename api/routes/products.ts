//@ts-check
import express from 'express';
const router = express.Router();
import multer from 'multer';
import {checkAuth} from 'auth_vvv';
import {deleteProduct, updateProduct, getProduct, createProduct, productAll} from "../controllers/products";

const storage = multer.diskStorage({
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

const upload = multer({storage, limits: {
    fileSize: 1024 * 1024 * 5
},fileFilter: fileFilter});

router.route('/')
    .get(productAll)
    .post(
        checkAuth,
        upload.single('productImage'),
        createProduct
);

router.route('/:id')
    .get(getProduct)
    .patch(checkAuth, updateProduct)
    .delete(checkAuth, deleteProduct);

module.exports = router;