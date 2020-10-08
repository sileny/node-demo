const express = require('express');
const app = express();

app.use(express.static('./client'));

app.use(function (req, res, next) {
    // 允许进行跨域访问的前端地址，因为利用ng serve启动angular程序，默认的端口是4200，所以，
    // 这里设置允许http://localhost:4200地址可以对服务器内容进行跨域访问
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    // 允许进行跨域访问的方法，这里主要用到的是GET和POST两种方法。
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    // 允许前端进行跨域访问的头部列表，程序需要进行用户名认证，所以这里设置为'Content-Type,Authorization'
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    // 发送Ajax时，Request header中便会带上 Cookie 信息。
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

app.get(function (req, res, next) {
    next();
});

const resultIndex = [{
    imgUrl: 'https://m2.cn.bing.com/az/hprichbg/rb/SpringtimeinGiverny_ZH-CN8223989854_1920x1080.jpg',
    id: Date.now()
}, {
    imgUrl: 'https://m2.cn.bing.com/az/hprichbg/rb/Love_ZH-CN11474763511_1920x1080.jpg',
    id: Date.now()
}, {
    imgUrl: 'https://m2.cn.bing.com/az/hprichbg/rb/FalcoPeregrinus_ZH-CN12522703608_1920x1080.jpg',
    id: Date.now()
}];

app.get('/', (req, res, next) => {
    res.json(resultIndex);
});

app.get('/home', (req, res, next) => {
	console.log(resultIndex);
    res.json(resultIndex);
});

app.get('/trade', (req, res, next) => {

});

app.get((req, res, next) => {
    res.redirect('/');
});

app.listen(3000, 'localhost', () => console.log('server is running at 3000 port'));
