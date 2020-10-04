const net = require('net');

// 检测端口是否被占用
function portIsOccupied(port) {
    // 创建服务并监听该端口
    let netServer = net.createServer().listen(port);

    netServer.on('listening', function () { // 执行这块代码说明端口未被占用
        netServer.close(); // 关闭服务
        console.log('The port【' + port + '】 is available.') // 控制台输出信息
    });

    netServer.on('error', function (err) {
        if (err.code === 'EADDRINUSE') { // 端口已经被使用
            console.log('The port【' + port + '】 is occupied, please change other port.')
            // 可以结束该端口所在的进程,然后重启服务
            console.log(process.pid);
            // 也可以更改端口,然后重启服务
        }
    });
}

module.exports.portIsOccupied = portIsOccupied;