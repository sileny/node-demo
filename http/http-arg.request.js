const http = require('http');

http.createServer(function (request, response) {

    console.log(request.url);

    if (request.url === '/favicon.ico') return;

    // 1、写入响应头
    response.writeHead(200, {
        'Content-Type': 'text/html;charset=utf8'
    });

    // 2、向客户端返回结果
    response.write('output \n');

    // 3、告诉请求完毕, 结束响应
    response.end();
}).listen(8080, 'localhost', () => {
    console.log('server is running');
});
