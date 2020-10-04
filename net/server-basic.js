const net = require('net');

const PORT = 3000, HOST = 'localhost';

// 当有客户端连接上，会创建一个socket连接
// socket是一个事件发射器，可以使用on监听事件
// 比如，监听事件，就使用 on('data', data => console.log(data))
const server = net.createServer(socket => {
    socket.on('data', data => {
        socket.write(data);
    });
    socket.end('goodbye');
});

server.on('error', function (error) {
    if (error.code === 'EADDRINUSE') {
        console.log('Address in use, retrying...');
        setTimeout(() => {
            server.close();
            server.listen(PORT, HOST);
        }, 1000);
    }
    console.log(error);
});

server.on('end', function () {
    console.log('client disconnected');
});

server.listen(PORT, HOST, () => console.log(`server is running at ${HOST}: ${PORT}`));

// 可以用下面的命令运行服务
// node server-basic.js

// 通过 telnet 来模拟客户端，windows 系统需要安装 telnet 客户端程序
