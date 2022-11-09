const express = require('express');
const { v4: uuidv4 } = require('uuid');
const _ = require('lodash');
const ProductService = require('../../services/products/products.service');

const router = express.Router();

const productService = new ProductService();

router.post('/', async (req, res, next) => {
    try{
        const { body } = req;
        if(_.isNil(body))(res.status(400).json({success: false, message: "REQ ERROR (Body missing)"}));
        Object.assign(body, {
            uuid: uuidv4()
        });
        const data = await productService.createProduct(body);
        if(!data.success)(res.status(500).json(data))
        res.status(200).json(data);
    }catch(err){
        next(err);
    }   
});

router.get('/', async (req, res, next) => {
    try{
        const data = await productService.getProducts();
        if(!data.success)(res.status(500).json(data))
        res.status(200).json(data);
    }catch(err){
        next(err);
    }
});

router.put('/:productUuid', async(req, res, next) => {
    try{
        const { productUuid } = req.params;
        const {body} = req;
        if(_.isNil(productUuid) || _.isNil(body))(res.status(400).json({success: false, message: "Req error"}));
        const data = await productService.updateProduct(productUuid, body)
        if(!data.success)(res.status(500).json(data))
        res.status(200).json(data);
    }catch(err){
        next(err);
    }
});

router.get('/:productUuid', async (req, res, next) => {
    try{
        const {productUuid} = req.params;
        if(_.isNil(productUuid))(res.status(400).json({success: false, message: "Req error"}));
        const data = await productService.getProduct(productUuid)
        if(!data.success)(res.status(500).json(data))
        res.status(200).json(data);
    }catch(err){
        next(err);
    }
});

router.delete('/:productUuid', async (req, res, next) => {
    try{
        const {productUuid} = req.params;
        if(_.isNil(productUuid))(res.status(400).json({success: false, message: "Req error"}));
        const data = await productService.deleteProduct(productUuid);
        if(!data.success)(res.status(500).json(data))
        res.status(200).json(data);
    }catch(err){
        next(err);
    }
})

module.exports = router;