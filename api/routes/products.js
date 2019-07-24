//@ts-check

const express = require('express');
const router = express.Router();
const multer = require('multer');
const {checkAuth} = require('auth_vvv');
const deleteProduct = require("../controllers/products").deleteProduct;
const updateProduct = require("../controllers/products").updateProduct;
const getProduct = require("../controllers/products").getProduct;
const createProduct = require("../controllers/products").createProduct;
const productAll = require("../controllers/products").productAll;



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