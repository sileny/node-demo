const express = require('express');
const router = express.Router();

// 连接路由
router.use(function (req, res, next) {
    console.log('product module');
    next();
});

router.get('/', function (req, res, next) {
    res.send('product');
});

router.get('/add', function (req, res, next) {
    res.send('/product/add');
});

router.get('/update', function (req, res, next) {
    res.send('/product/update');
});

router.get('/delete', function (req, res, next) {
    res.send('/product/delete');
});

module.exports = router;