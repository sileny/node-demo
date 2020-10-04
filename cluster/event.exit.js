const cluster = require('cluster');

if (cluster.isMaster) {
    const worker = cluster.fork();

    worker.on('listening', host => {
        worker.send('shutdown');
        // 断开
        worker.disconnect();
    });

    worker.on('disconnect', () => {
        console.log('disconnect');
    });

    worker.on('exit', (code, signal) => {
        console.log(code, signal);
        if (signal) {
            console.log(`worker was killed by signal: ${signal}`);
        }
        if (code === 0) {
            console.log('worker was normally exited');
        } else {
            console.log(`worker exited with error code: ${code}`);
        }
    });
} else if (cluster.isWorker) {
    const http = require('http');
    const server = http.createServer(function (req, res) {
        res.end('hello');
    });
    server.listen(3000);

    // const net = require('net');
    // const netServer = net.createServer((socket) => {
    //     socket.send('msg');
    // });
    // netServer.listen(3333, () => 'server is running at 3333 port');

    process.on('message', msg => {
        console.log(msg);
    });
}
