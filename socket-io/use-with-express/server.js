const app = require('express')();
const server = require('http').Server(app);
server.listen(80);

const io = require('socket.io')(server);

app.get('/', (req, res) => {
    res.sendfile(__dirname + '/index.html');
});

// 2、服务端保持连接
io.on('connection', function (socket) {
    // 3、服务端发送数据到客户端
    socket.emit('news', {hello: 'world'});
    // 6、接收客户端发送消息
    socket.on('my other event', function (data) {
        console.log(data);
    });
});