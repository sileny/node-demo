const express = require('express');
const app = express();

/**
 * 1、npm install express
 * 2、npm install ejs
 * 3、配置模板引擎
 */
// 配置ejs模板引擎
app.set('view engine', 'ejs');

// 设置模板的位置：在views目录下。默认模板引擎的位置在`views`目录下。
// app.set('views', __dirname + '/views');

app.get('/', function (req, res) {
    // 渲染`index.ejs`
    res.render('index');
    // 相当于ejs.renderFile('./views/index.ejs')
});

app.listen(3000, 'localhost', () => console.log('server is running at 3000'))