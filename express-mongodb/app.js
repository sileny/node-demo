const express = require('express');
const app = express();

const DB = require('./db');

app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
    // --------------- 5、查询数据库表后，根据结果渲染页面 ---------------
    DB.find('test', 'product', {}, (error, result) => {
        if (error) throw error;
        // 渲染结果到product页面
        res.render('product', {
            list: result
        });
    });
});

app.get('/add', (req, res, next) => {
    DB.insert('test', 'product', {
        name: 'banana',
        price: 2.5,
        img: 'banana.png'
    }, (error, result) => {
        if (error) throw error;
        console.log(result);
        // 插入成功后，重新渲染页面
        res.redirect('/');
    });
});

app.get('/delete', (req, res, next) => {
    DB.del('test', 'product', {
        name: 'banana'
    }, (error, result) => {
        if (error) throw error;
        // 删除成功后
        res.redirect('/');
    })
});

app.get('/update', (req, res, next) => {
    DB.update('test', 'product', {
        name: 'banana'
    }, {
        price: 3
    }, (error, result) => {
        if (error) throw error;
        // 删除成功后
        res.redirect('/');
    })
});

app.listen(3000);