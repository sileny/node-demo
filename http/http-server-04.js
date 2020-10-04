const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const server = http.createServer();

const htmlDir = __dirname + '/html/';

server.on('request', (req, res) => {
    let urlStr = url.parse(req.url);
    switch (urlStr.pathname) {
        // 路径为`/`或`/home`
        case '/':
        case '/home':
            // 跳转到`home.html`
            reqUrl(htmlDir + 'home.html', req, res);
            break;
        case '/user':
            reqUrl(htmlDir + 'user.html', req, res);
            break;
        case '/login':
            reqUrl(htmlDir + 'login.html', req, res);
            break;
        case '/login/check':
            // 如果为post请求方式
            if (req.method.toLowerCase() === 'post') {
                let str = '';
                req.on('data', function (chunk) {
                    str += chunk;
                });
                req.on('end', function () {
                    console.log(querystring.parse(str))
                });
            }
            break;
        default:
            // 404
            res.writeHead(404, {
                'Content-Type': 'text/html;charset=utf-8'
            });
            res.end('<h4>404</h4>');
            // 其他情况
            break;
    }
});

function reqUrl(file, req, res) {
    // 请求读取文件
    fs.readFile(file, (err, data) => {
        if (err) {
            res.writeHead(404, {
                'Content-Type': 'text/html;charset=utf-8'
            });
            res.end('<h4>404</h4>');
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/html;charset=utf-8'
            });
            res.end(data);
        }
    });
}

server.listen(8080, 'localhost');