// ---------- 如何使用body-parser模块 ----------
const express = require('express');
const app = express();
// express.js里引用了body-parser模块
// const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.set(express.static('public'));

// 1、使用body-parser中间件处理post请求(parser x-www-form-urlencoded)
app.use(express.urlencoded({extended: false}));

// 2、使用body-parser中间件处理json请求
app.use(express.json());

app.get('/', (req, res) => res.send('index'));
app.get('/login', (req, res) => res.render('login'));
// 3、获取请求体
app.post('/doLogin', (req, res) => console.log(req.body));

app.listen(3000, 'localhost', () => console.log('server is running at 3000'));