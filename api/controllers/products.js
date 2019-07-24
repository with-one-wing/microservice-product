const mongoose = require('mongoose');
const Product = require('../models/product');

exports.productAll = async (req, res, next) => {
    try {
        const list = await Product.find().select('name price productImage _id');
        const resp = {
            count: list.length,
            products: list.map(obj => {
                return {
                    _id: obj._id,
                    name: obj.name,
                    price: obj.price,
                    productImage: obj.productImage,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + obj._id
                    }
                }
            })
        };
        res.status(200).json(resp);
    } catch (e) {
        next(e);
    }
};

exports.createProduct = async (req, res, next) => {
    try {
        const product = new Product({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            price: req.body.price,
            productImage: req.file.path
        });
        await product.save();
        res.status(201).json({
            _id: product._id,
            name: product.name,
            price: product.price,
            request: {type: 'GET', url: 'http://localhost:3000/products/' + product._id}
        });
    } catch(err) {
        next(err);
    }
};

exports.getProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id).select('name price _id productImage');

        res.status(200).json({
            res: product,
            request: {
                type: 'GET',
                description: 'Get all products',
                url: 'http://localhost:3000/products/'
            }
        });
    } catch (e) {
        next(e);
    }

};

exports.updateProduct = async (req, res, next) => {
    try {
        const product = await Product.update({_id: req.params.id}, req.body);
        res.status(202).json({
            res: product,
            request: {
                type: 'GET',
                description: 'Get all products',
                request: {type: 'GET', url: 'http://localhost:3000/products/' + product._id}
            }
        });
    } catch (e) {
        next(e);
    }

};

exports.deleteProduct = async (req, res, next) => {

    try {
        const result = await Product.findByIdAndRemove(req.params.id);
        res.status(202).json({
            'message': 'Successfully deleted',
            'result': result
        });
    } catch (e) {
        next(e);
    }

};