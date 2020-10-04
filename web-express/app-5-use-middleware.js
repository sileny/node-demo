// ---------- 路由中间件 ----------
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

// 设置中间件(接收任意路由，每次请求都会走到这里)
app.use(function (req, res, next) {
    console.log(new Date());
    // 如果没有这么一步操作，也没有`res.end()`，最终会响应失败
    // 有了这么一步，可以匹配下一个路由。
    // 那么，中间件适合做权限管理。有点类似于angular的路由守卫
    next();
});

app.get('/', function (req, res, next) {
    res.send('index');
});
app.get('/news', function (req, res, next) {
    console.log('路由中间件，中间倒腾了');
    next();
});
app.get('/news', function (req, res, next) {
    res.send('返回结果');
});

// 如果上述路由都不满足条件，那么最终返回404
app.get(function (req, res) {
    res.status(404).send('404');
});

app.listen(3000, 'localhost', () => console.log('server is running at 3000'));
