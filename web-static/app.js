const express = require('express');
const app = express();

const expressSession = require('express-session');

const MongoClient = require('mongodb').MongoClient;
const DB_URL = 'mongodb://localhost:27017';

// 设置ejs模板引擎
app.set('view engine', 'ejs');

// 使用中间件处理静态资源请求
app.use(express.static('public'));

// 使用表单解析中间件
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// ---1 使用session中间件
app.use(expressSession({
    cookie: {
        maxAge: 24 * 60 * 60
    },
    name: 'session-id',
    resave: false,
    saveUninitialized: true,
    secret: 'keyboard',
    rolling: true
}));

// ------------- 保存的全局数据 -------------
// 记录登陆状态(ejs提供的保存全局数据的对象,可以直接在ejs模板里使用;使用时直接使用`userInfo.的方式获取`)
app.locals.userInfo = {};

// 每次请求都会走这里
// ---1 使用自定义中间件处理是否已经登陆过
app.use((req, res, next) => {
    console.log(req.url);
    // 如果路径为`/login`或`/doLogin`，则不进行权限判断，继续执行代码
    if (req.url === '/login' || req.url === '/doLogin') {
        next();
    } else {
        // 没有登陆，重定向到登陆页(根据session判断)
        console.log(req.session.userInfo, 43);
        // 已经登陆
        // if (expressSession.userInfo && expressSession.userInfo.username && expressSession.userInfo.password) {
        if (req.session.userInfo) {
            if (req.session.userInfo.username && req.session.userInfo.password) {
                // ------------- 保存的全局数据 -------------
                app.locals.userInfo = req.session.userInfo;
                next();
            } else {
                res.redirect('/login');
            }
        } else {
            res.redirect('/login');
        }
    }
});

// 配置路由
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/doLogin', (req, res) => {
    // 如果未登录，跳转到登陆页面
    // 如果登陆成功，跳转到商品列表页
    // ---1 如果已经登陆成功，即使输入`/login`，则不再跳转到login页面(用到express-session模块和`自定义中间件`)

    // 代码分析：
    // 需要解析表单数据(body-parser[express引用了body-parser模块,需要配置中间件,然后使用res.body即可获取表单数据])
    // 根据解析后的表单数据查询数据库里是否有该账户(用到mongodb模块)
    // 如果有，而且密码一致
    //      跳转到product页面
    //      否则，跳转到登陆页面(可以使用重定向)
    console.log(req.url, req.body, req.method);
    if (!req.body) {
        res.redirect('/login');
        return;
    }
    // 连接数据库
    MongoClient.connect(DB_URL, (err, db) => {
        if (err) {
            // 重定向到`/login`
            res.redirect('/login');
            return;
        }
        let dbo = db.db('test');
        dbo.collection('user').find({
            username: req.body.username,// admin
            password: req.body.password// 123456
        }).toArray((error, result) => {
            if (error) throw error;
            // console.log(result);
            // 如果没有查询到
            if (result.length === 0) {
                res.redirect('/login');
            } else {
                // ---1 保存登陆数据信息
                // expressSession.userInfo = result[0];
                req.session.userInfo = result[0];
                res.redirect('/product');
            }
            // 关闭数据库连接
            db.close();
        });
    });
});

app.get('/logout', (req, res) => {
    // 销毁cookie
    // ------------- 清理保存的全局数据 -------------
    // 清理全局保存的值
    // req.session.userInfo = null;
    // res.clearCookie('session-id');
    req.session.destroy(function (err) {
        if (err) throw err;
        res.redirect('/login');
    });
});

app.get('/product', (req, res) => {
    // 连接数据库
    MongoClient.connect(DB_URL, (err, db) => {
        if (err) throw err;
        let dbo = db.db('test');
        // 从product表里获取数据
        dbo.collection('product').find().toArray((error, result) => {
            if (error) throw error;
            // 数据渲染到product页面
            res.render('product', {
                list: result
            });
            // 关闭数据库连接
            db.close();
        });
    });
});

app.get('/productAdd', (req, res) => {
    res.render('productAdd');
});

app.get('/productEdit', (req, res) => {
    res.render('productEdit');
});

app.get('/productDelete', (req, res) => {
    res.render('productDelete');
});

app.listen(3000, 'localhost', () => console.log('server is running at 3000'));
