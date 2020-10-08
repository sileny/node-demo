const express = require('express');
const session = require('express-session');
const app = express();

// 1、使用中间件
app.use(session({
    secret: 'keyboard',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    },
    rolling: true
}));

// 3、获取session
app.get('/', (req, res) => {
    if (req.session.username) {
        res.send('欢迎回来：' + req.session.username);
    } else {
        res.send('未登录');
    }
});

// 2、设置session
app.get('/login', (req, res) => {
    req.session.username = '张三';
    res.send('登陆成功');
    console.log(req.session)
});

// 4、销毁session(实现退出登陆)
app.get('/logout', (req, res) => {
    // 最简单的方式
    // req.session.cookie.maxAge = 0;
    req.session.destroy(function (err) {
        if (err) throw err;
    });
    // res.send('退出成功');
});

app.listen(3000, 'localhost', () => console.log('server is running at 3000'));