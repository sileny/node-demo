// ---------- response.render ----------
const express = require('express');
const app = express();

// 设置模板引擎
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    // 渲染`app3.ejs`
    res.render('app3', {
        data: ['a', 'b', 'c', 'd']
    });
    // 相当于
    // ejs.renderFile('./views/app3.ejs', {
    //      data: ['a', 'b', 'c', 'd']
    // }, (err, data) => res.send(data))
});

app.listen(3000, 'localhost', () => {
    console.log('server is running at 3000');
});