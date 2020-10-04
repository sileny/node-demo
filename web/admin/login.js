const express = require('express');
const router = express.Router();

router.use(function (req, res, next) {
    console.log('/admin/login');
    next();
});

router.get('/', (req, res) => res.send('/admin/login'));

router.post('/doLogin', (req, res, next) => res.redirect('/'));

module.exports = router;
