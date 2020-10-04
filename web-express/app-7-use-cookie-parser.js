const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.set('view engine', 'ejs');

// 1、使用中间件
app.use(cookieParser());

app.get('/', (req, res) => {
    // 3、获取cookie(使用`cookie-parser`才可以通过request来访问cookie --> req.cookies)
    res.send(JSON.stringify(req.cookies));
});

// 2、设置cookie,并返回响应,否则客户端无法获取cookie
app.get('/set', (req, res) => {
    // 第一参数：key
    // 第二参数：value
    // 第三参数：是个对象，包含以下属性。
    //          domain: 可以实现域名共享cookie。
    //              www.google.com -- 顶级域名;news.google.com、email.google.com等是二级域名
    //              如果要实现域名共享cookie，那么可以这样写: {domain: '.google.com'}
    //          expires/maxAge: 设置cookie超时时间。
    //              {maxAge：60000} 相当于 {expires: new Date(Date.now() + 60000)}
    //          httpOnly: 设置为true,表示只可以在服务端操作，客户端js无法操作，可以防止xss攻击。
    //          path: 设置cookie起作用的路径。
    //              {path: '/news'} 则只会在路径为`/news`时起作用。
    //          secure: 如果指定了secure为true，只有在https里才可以看到，在http里是无效的。
    //          singed: 表示是否签名cookie，true表示对cookie签名。
    //              设置签名后，需要使用response.singedCookies来访问，response.cookies访问不到
    //              被篡改的签名cookie会被服务器拒绝，并且cookie会被重置为初始值。
    res.cookie('username', 'cookie-value', {maxAge: 600000, httpOnly: true});
    res.send('set cookie succeed');
});

app.listen(3000, 'localhost', () => console.log('server is running at port 3000'));