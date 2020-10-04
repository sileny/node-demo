//引入http模块
const http = require('http');
//fs模块
const fs = require('fs');
// 处理路径
const path = require('path');
const url = require('url');

// 处理后缀名
let mime = require('./getMimeFromFile');
// console.log(mime.getMime('.html'));

http.createServer(function (request, response) {
    //http://localhost:8001/news.html    /news.html
    //http://localhost:8001/index.html    /index.html

    //css/dmb.bottom.css

    let pathname = url.parse(request.url).pathname;
    /*默认加载的首页*/
    if (pathname === '/') {
        pathname = 'index.html';
    }

    let extName = path.extname(pathname);

    /*过滤请求favicon.ico*/
    if (pathname !== '/favicon.ico') {
        console.log(pathname, extName, 111);

        fs.readFile(pathname === 'index.html' ? 'static/' + pathname : pathname.substring(1), function (err, data) {
            // 么有这个文件,则读取404页面
            if (err) {
                console.log('404');
                fs.readFile('static/404.html', function (error404, data404) {
                    if (error404) {
                        console.log(error404);
                    }
                    // 1、设置响应头
                    response.writeHead(404, {"Content-Type": "text/html;charset='utf-8'"});
                    // 2、返回响应内容
                    response.write(data404);
                    // 3、结束响应
                    response.end();
                });
            } else { /*读取到这个文件*/
                // 获取文件类型
                let mimeType = mime.getMime(extName);
                // 1、设置响应头
                response.writeHead(200, {"Content-Type": mimeType + ";charset='utf-8'"});
                // 2、返回响应内容
                response.write(data);
                // 3、结束响应
                response.end();
            }
        });
    }
}).listen(3000, 'localhost', () => {
    console.log('server is running');
});
