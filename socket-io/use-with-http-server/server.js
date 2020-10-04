const app = require('http').createServer(handler);
const io = require('socket.io')(app);
const fs = require('fs');

app.listen(80);

function handler(req, res) {
    fs.readFile(__dirname + '/index.html', (err, data) => {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }

        res.writeHead(200);
        res.end(data);
    });
}

// 2、服务端监听连接(服务保持)
io.on('connection', function (socket) {
    // 3、服务端向客户端发送数据
    socket.emit('news', {hello: 'world'});
    // 6、服务端监听客户端数据
    socket.on('my other event', function (data) {
        console.log(data);
    });
});