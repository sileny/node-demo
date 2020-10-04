const fs = require('fs');
const url = require('url');
const http = require('http');

// 存储请求方法
let G = {};

function app(request, response) {
    // 获取路由地址
    let pathname = url.parse(request.url).pathname;
    // 根据路由渲染
    if (G[pathname]) {
        G[pathname](request, response);
    } else {
        response.end('404');
    }
}

// get请求 -- 注册方法
app.get = function (url, callback) {
    G[url] = callback;
};

http.createServer(app).listen(8000, 'localhost', () => {
    console.log('server is running at 8000');
});

// usage
// 1、注册路由请求
app.get('/', function (request, response) {
    response.end('index');
});
app.get('/login', function (request, response) {
    response.end('login');
});