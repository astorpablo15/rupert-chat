const express = require('express');
const router = express.Router();
const productRoutes = require('./products/products.routes');

router.get('/health', async (_req, res) => {
    res.status(200).json({
        success: true,
        environment: process.env.ENVIRONMENT || 'undefined',
        health: 'Up!'
    })
})
.use('/products', productRoutes);

module.exports = router;