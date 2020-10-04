const express = require('express');
const router = express.Router();

let login = require('./login');
let manager = require('./manager');

// 使用内置的中间件拦截路由处理
router.use((req, res, next) => {
    console.log('admin module');
    next();
});

router.get('/', (req, res, next) => res.send('admin index'));

// 当路由为`/admin/login`，将使用login模块处理业务
router.use('/login', login);
// 当路由为`/admin/manager`，将使用manager模块处理业务
router.use('/manager', manager);

module.exports = router;