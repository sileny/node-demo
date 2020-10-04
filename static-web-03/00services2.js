//引入http模块
let http = require('http');

let url = require('url');
//路由:指的就是针对不同请求的 URL，处理不同的业务逻辑。

// 引入端口占用校验
let checkPort = require('./portIsOccupied');

let server = http.createServer(function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html;charset=utf-8'
    });
    let pathname = url.parse(req.url).pathname;
    if (pathname === '/login') {
        res.end('login');
    } else if (pathname === '/register') {
        res.end('register');
    } else if (pathname === '/order') {
        res.end('order');
    } else {
        res.end('index');
    }
});

// server.listen(8001, 'localhost');
console.log(checkPort.portIsOccupied(8001));
server.listen(8001, 'localhost');

// 端口被占用
// EADDRINUSE: E -> error; ADDR -> address; IN -> 在; USE -> 使用中
// Error: listen EADDRINUSE :::8001

// 解决方案：
// cmd
// netstat -ano

// 可以看到如下显示内容
// 协议  本地地址          外部地址        状态           PID
//   TCP    0.0.0.0:135            0.0.0.0:0              LISTENING       656
//   TCP    0.0.0.0:445            0.0.0.0:0              LISTENING       4
//   TCP    0.0.0.0:2869           0.0.0.0:0              LISTENING       4
//   TCP    0.0.0.0:5357           0.0.0.0:0              LISTENING       4
//   TCP    0.0.0.0:8001           0.0.0.0:0              LISTENING       10908

// 找到8001对应的pid(这里的pid：10908)
// tskill pid