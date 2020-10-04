const http = require('http');
const zlib = require('zlib');
const fs = require('fs');

const server = http.createServer(function (req, res) {
    // 1、获取请求头
    const acceptEncoding = req.headers['accept-encoding'];
    // 2、如果请求头没有设置gzip
    if (acceptEncoding.indexOf('gzip') !== -1) {
        // 3、写入gzip头
        res.writeHead(200, {
            'Content-Encoding': 'gzip'
        });
        // 4、读取文件流，输出
        fs.createReadStream('./zlib.html').pipe(zlib.createGzip()).pipe(res);
    } else {
        fs.createReadStream('./zlib.html').pipe(res);
    }
});

server.listen('3000');