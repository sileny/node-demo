const http = require('http');

const PORT = 3000, HOST = 'localhost';

http.createServer(function (request, response) {

    console.log(request.url);

    // 1、写入响应头
    response.writeHead(200, {
        'Content-Type': 'text/html;charset=utf8'
    });

    // 2、向客户端返回结果
    response.write('result need output \n');
    response.write('second output');

    // 3、告诉请求完毕, 结束响应
    response.end();

    // 上面两步可以合并为一个步骤
    // response.end('result need output \n second output');
}).listen(PORT, HOST, () => {
    // 可以用来处理端口冲突(使用全局对象保存)
    console.log(process.pid);
    console.log(`server is running at ${HOST}: ${PORT}`);
});

// 可以拆分成几步：
// const server = http.createServer();
// server.on('request', function(req, res){res.end('output')});
// server.on('listening', function(){console.log('server is listening at ${HOST}: ${PORT}`)});
// server.listen(PORT);