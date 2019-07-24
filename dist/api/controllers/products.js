var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const mongoose = require('mongoose');
const Product = require('../models/product');
exports.productAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const list = yield Product.find().select('name price productImage _id');
        const resp = {
            count: list.length,
            products: list.map(obj => {
                return { _id: obj._id,
                    name: obj.name,
                    price: obj.price,
                    productImage: obj.productImage,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + obj._id
                    }
                };
            })
        };
        res.status(200).json(resp);
    }
    catch (e) {
        next(e);
    }
});
exports.createProduct = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const product = new Product({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            price: req.body.price,
            productImage: req.file.path
        });
        yield product.save();
        res.status(201).json({
            _id: product._id,
            name: product.name,
            price: product.price,
            request: { type: 'GET', url: 'http://localhost:3000/products/' + product._id }
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getProduct = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const product = yield Product.findById(id).select('name price _id productImage');
        res.status(200).json({
            res: product,
            request: {
                type: 'GET',
                description: 'Get all products',
                url: 'http://localhost:3000/products/'
            }
        });
    }
    catch (e) {
        next(e);
    }
});
exports.updateProduct = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const product = yield Product.update({ _id: req.params.id }, req.body);
        res.status(202).json({
            res: product,
            request: {
                type: 'GET',
                description: 'Get all products',
                request: { type: 'GET', url: 'http://localhost:3000/products/' + product._id }
            }
        });
    }
    catch (e) {
        next(e);
    }
});
exports.deleteProduct = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const result = yield Product.findByIdAndRemove(req.params.id);
        res.status(202).json({
            'message': 'Successfully deleted',
            'result': result
        });
    }
    catch (e) {
        next(e);
    }
});
