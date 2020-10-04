const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.set('view engine', 'ejs');

// 1、使用中间件(`sign`字符串的作用:表示用该字符串对cookie加密)
app.use(cookieParser('sign'));

app.get('/', (req, res) => {
    // 3、获取cookie(使用cookie-parser才可以通过request来访问cookie --> req.cookies)
    res.send(JSON.stringify(req.signedCookies));
});

// 2、设置cookie,并返回响应,否则客户端无法获取cookie
app.get('/set', (req, res) => {
    // 设置为加密存储(`app.use(cookieParser(输入字符串或数组作为参数))`)
    res.cookie('username', 'cookie-value', {maxAge: 60000, signed: true});
    res.send('set cookie succeed');
});

app.listen(3000, 'localhost', () => console.log('server is running at port 3000'));