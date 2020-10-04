const http = require('http');
// 处理请求路径
const url = require('url');
const server = http.createServer();

/**
 * 根据用户请求的地址不同做不同的响应
 */
server.on('request', (req, res) => {
    // 处理请求路径
    const urlStr = url.parse(req.url);
    console.log(urlStr);
    switch (urlStr.pathname) {
        case '/':
            // 首页
            res.writeHead(200, {
                'Content-Type': 'text/html;charset=utf-8'
            });
            res.write('<h1>这是首页</h1>');
            res.end();
            break;
        case '/user':
            // user界面
            res.writeHead(200, {
                'Content-Type': 'text/html;charset=utf-8'
            });
            res.write('<h1>个人中心</h1>');
            res.end();
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

server.listen(8080, 'localhost');

/**
 * 存在的问题：
 * html写在了js里，需要分离
 */

/**
 * url.parse用法
 */
// const testUrl = 'https://www.t.com/folder/index.html?key=123#b=456';
// console.log(url.parse(testUrl));
// Url {
//   protocol: 'https:',
//   slashes: true,
//   auth: null,
//   host: 'www.t.com',
//   port: null,
//   hostname: 'www.t.com',
//   hash: '#b=456',
//   search: '?key=123',
//   query: 'key=123',
//   pathname: '/folder/index.html',
//   path: '/folder/index.html?key=123',
//   href: 'https://www.t.com/folder/index.html?key=123#b=456' }