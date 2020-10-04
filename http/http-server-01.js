const http = require('http');
// 1、创建服务器
const server = http.createServer(/* [requestListener] 会被自动添加到request事件 */);

// 2、事件处理
server.on('error', function (err) {
    console.log(err);
});
server.on('listening', function () {
    console.log('listening');
});

/**
 * request 客户端请求信息
 * response 服务端向客户端发送的内容
 */
server.on('request', function (req, res) {
    console.log('客户端有请求了');

    // 设置头部信息 -- 相当于writeHead的第三参数的独立版本
    // 设置的信息在`response headers`里可以看到
    res.setHeader('key', 'value');

    // statusCode, reason, headerInfo{}
    // 1.1、状态码; 与状态码对应的描述文字(默认不写); 头信息--告诉浏览器如何处理response.write的内容
    res.writeHead(200, {
        'Content-Type': 'text/plain;charset=utf-8'
    });

    // 1.2、response.write(浏览器接收的正文内容);
    res.write('<h1>hello</h1>');

    // 该方法会通知服务器，所有响应头和响应主体都已被发送，即服务器将其视为已完成。每次响应都必须调用 response.end() 方法。
    // 如果指定了 data，则相当于调用 response.write(data, encoding) 之后再调用 response.end(callback)。
    // 如果指定了 callback，则当响应流结束时被调用。
    // 1.3、通知完成
    res.end();

    /**
     * 第二步和第三步可以合并为一步：
     * res.end('<h1>hello</h1>');
     * 这相当于先调用了res.write('<h1>hello</h1>');
     * 然后,再次调用res.end();
     */
});


// 3、监听
server.listen(8080, 'localhost', () => {
    console.log('server is running');
});