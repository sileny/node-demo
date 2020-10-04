const fs = require('fs');
const url = require('url');
const path = require('path');

function getMime(extName, callback) {
    fs.readFile('./mime.json', function (err, data) {
        if (err) return;
        let mimes = JSON.parse(data.toString()), result = mimes[extName] || 'text/html';
        callback(result);
    });
}

module.exports.statics = function (req, res, staticPath) {
    let pathname = url.parse(req.url).pathname;
    console.log(pathname);

    /*默认加载的首页*/
    if (pathname === '/') pathname = '/index.html';

    //获取文件的后缀名
    let extName = path.extname(pathname);

    if (pathname !== '/favicon.ico') {  /*过滤请求favicon.ico*/
        //console.log(pathname);
        //文件操作获取 static下面的index.html
        fs.readFile(staticPath + pathname, function (err, data) {
            if (err) {  /*么有这个文件*/
                console.log('404');
                fs.readFile('static/404.html', function (error, data404) {
                    if (error) {
                        console.log(error);
                    }
                    res.writeHead(404, {"Content-Type": "text/html;charset='utf-8'"});
                    res.write(data404);
                    res.end();
                    /*结束响应*/
                });
            } else {
                // let mime = getMime(extName);
                // // 获取文件类型
                // res.writeHead(200, {"Content-Type": "" + mime + ";charset='utf-8'"});
                // res.write(data);
                // // 结束响应
                // res.end();
                // 改写成下面的形式
                getMime(extName, function (mime) {
                    res.writeHead(200, {
                        'Content-Type': mime + ';charset=utf-8'
                    });
                    res.write(data);
                    res.end();
                });
            }
        });
    }
};