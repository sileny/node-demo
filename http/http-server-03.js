const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer();

const htmlDir = __dirname + '/html/';

server.on('request', (req, res) => {
    let urlStr = url.parse(req.url);
    switch (urlStr.pathname) {
        case '/':
        case '/home':
            reqUrl(htmlDir + 'home.html', req, res);
            break;
        case '/user':
            reqUrl(htmlDir + 'user.html', req, res);
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