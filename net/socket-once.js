const net = require('net');

// 创建服务端
const server = net.createServer(socket => {
  // 监听一次数据
  socket.once('data', data => {
    // 写出数据
    socket.write(data);
  });
});

// 运行在8888端口
server.listen(8888);
