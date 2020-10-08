const express = require('express');
const session = require('express-session');
const app = express();

// 客户端              服务端
// 访问服务器     -- 服务器创建一个session对象，返回key(cookie)内容到客户端
// 再次访问服务器 -- 接收客户端携带的key，根据key返回内容到客户端

// 1、使用中间件
app.use(session({
    secret: 'keyboard',// 随意写，作为服务端生成session的签名
    resave: false,
    saveUninitialized: false,// false表示未声明则客户端不会保存session；声明但未初始化
    // name: "you can call it another name", // 保存在客户端的cookie的名字，默认是connect.sid。可以设置为自己定义的。
    // cookie: {secure: true}// https才可以使用
    cookie: {// 这里跟cookie一致
        maxAge: 60000
    },
    rolling: true // 表示直到没有请求时才开始计算过期时间
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

app.listen(3000, 'localhost', () => console.log('server is running at 3000'));