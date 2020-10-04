const fs = require('fs');
const http = require('http');
const url = require('url');
const path = require('path');
const ejs = require('ejs');

let server = http.createServer(function (request, response) {
    // 1、设置响应头
    response.writeHead(200, {
        'Content-Type': 'text/html;charset=utf=8'
    });
    let reqUrl = url.parse(request.url, true);
    // 获取请求地址
    let pathname = reqUrl.pathname;
    // console.log(pathname);
    // 如果请求地址为`/login`
    if (pathname === '/login') {
        // 渲染页面
        ejs.renderFile('views/form.ejs', {
            // 渲染的数据
            loginString: 'login string'
        }, function (err, data) {
            if (err) throw err;
            // 2、返回数据
            response.end(data);
        });
    } else if (pathname === '/register') {
        ejs.renderFile('views/register.ejs', {
            list: [1, 2, 3, 4, 5]
        }, function (err, data) {
            if (err) throw err;
            response.write(data);
            response.end();
        });
    } else if (pathname === '' || pathname === '/') {
        ejs.renderFile('./views/index.ejs', {
            html: '<h2>escape html</h2>'
        }, function (err, data) {
            if (err) throw err;
            response.write(data);
            response.end();
        });
        // 如果为post请求
    } else if (pathname === '/dologin' && request.method === 'POST') {
        console.log(12134);
        // 接收post数据
        let result = '';
        request.on('data', function (data) {
            result += data;
        });
        // 接收数据完毕
        request.on('end', function (err, chunk) {

            // 向数据库写入内容
            fs.appendFile('./log/login.txt', result, 'utf-8', function (err) {
                if (err) throw err;
                console.log('写入数据库成功');
            });

            // 服务端返回脚本
            response.write(
                '<script>console.log("' + result + '");</script>'
            );
            response.end();
        });
    }
    // 如果请求地址为`/`
});

server.listen(8000, 'localhost', () => {
    console.log('server is running at port 8000');
});