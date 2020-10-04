const fs = require('fs');
const url = require('url');
const http = require('http');

// 引入路由模块
let router = require('./model/model');

let server = http.createServer(function (request, response) {
    // 1、设置响应头
    response.writeHead(200, {
        'Content-Type': 'text/html;charset=utf-8'
    });
    let reqUrl = url.parse(request.url, true);
    // 获取请求地址
    let pathname = reqUrl.pathname;
    if (pathname === '/favicon.ico') return;
    let me = pathname.substring(1);
    try {
        router.app[me](request, response);
    } catch (err) {
        router.app['home'](request, response);
    }
});

server.listen(8000, 'localhost', () => {
    console.log('server is running at 8000');
});
