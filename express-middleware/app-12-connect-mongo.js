
/**
 * 负载均衡：
 * 第一次访问时，将session保存在数据库，然后用户再次访问服务器，则从数据库获取session。
 * 不同用户访问不同(地区)的服务器，如果web代理服务器判断某个服务器访问压力大，
 * web代理服务器会把访问请求转向另外一台服务器
 */
// npmjs.com/package/connect-mongo
// npm i connect-mongo
const express = require('express');
const app = express();

// 1、引入模块
const expressSession = require('express-session');
const ConnectMongo = require('connect-mongo')(expressSession);

// 2、配置中间件
app.use(expressSession({
    secret: 'keyboard',
    saveUninitialized: false,
    resave: false,
    store: new ConnectMongo({// 需要启动mongo服务
        url: 'mongodb://localhost:27017/test',// 连接test数据库,成功后会自动创建sessions表(注意:test后不要加`/`)
        touchAfter: 24 * 60 * 60// 直到24小时后才更新到数据库,除非手动更新session
    })
}));

app.get('/', (req, res) => {
    if (req.session.username) {
        res.send('欢迎回来,' + req.session.username);
    } else {
        res.send('未登录');
    }
});

app.get('/login', (req, res) => {
    req.session.username = '张三';
    res.send('登陆成功');
});

app.listen(3000, 'localhost', () => console.log('server is running at 3000 port'));