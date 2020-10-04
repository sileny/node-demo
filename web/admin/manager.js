const express = require('express');
const router = express.Router();

// 使用中间件
router.use((req, res, next) => {
    console.log('manager module');
    next();
});
router.get('/', (req, res, next) => res.send('/admin/manger'));

// 匹配不到路由时，返回错误
router.get('/**', function (req, res, next) {
    res.sendStatus(404);
});

module.exports = router;