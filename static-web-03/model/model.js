const fs = require('fs');
const ejs = require('ejs');
// 封装路由
const app = {
    // 路由地址为`/login`
    login: function (request, response) {
        // 渲染`form.ejs`页面
        ejs.renderFile('./views/form.ejs', {

        }, function (err, data) {
            if (err) throw err;
            response.end(data);
        });
    },
    dologin: function (request, response) {
        let method = request.method.toLowerCase(), result = '';
        if (method === 'post') {
            // 接收客户端Post请求数据
            request.on('data', function (data) {
                result += data;
            });
            // 接收数据完毕
            request.on('end', function (err, chunk) {
                // 添加到数据库
                fs.appendFile('./log/login.txt', result, 'utf-8', function (err) {
                    if (err) throw err;
                    console.log('写入数据库成功');
                });
                // 返回值(服务端调用js)
                response.end('<script>console.log("' + result + '");</script>');
            });
        }
    },
    register: function (request, response) {
        response.end('register');
    },
    home: function (request, response) {
        response.end('home');
    }
};

module.exports.app = app;