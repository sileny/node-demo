const cluster = require('cluster');
const http = require('http');

/**
 * 利用cluster记录请求的次数
 */
if (cluster.isMaster) {
    // 跟踪http请求
    let reqNum = 0;
    setInterval(() => {
        console.log(`reqNum = ${reqNum}`);
    }, 1000);

    // 计算请求数目
    function messageHandler(msg) {
        if (msg.cmd && msg.cmd === 'notifyRequest') {
            reqNum += 1;
        }
    }

    // 启动worker并监听包含notifyRequest的消息
    const numCpus = require('os').cpus().length;
    for (let i = 0; i < numCpus; i++) {
        cluster.fork();
    }

    for (const id in cluster.workers) {
        cluster.workers[id].on('message', messageHandler);
    }
} else {
    http.createServer((req, res) => {
        res.writeHead(200, {'Content-Type': 'charset=utf8'});
        res.end('hello');

        // 通知master进程接收到了请求
        process.send({cmd: 'notifyRequest'});
    }).listen(3000);
}
