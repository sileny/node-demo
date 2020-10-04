const url = require('url');
// 存储请求方法
const G = {
    _get: {},
    _post: {}
};

// 当请求改变时，返回不同的数据
function changeRes(res) {
    res.send = function (data) {
        // 设置响应头
        res.writeHead(200, {
            'Content-Type': 'text/html;charset=utf-8'
        });
        // 返回内容
        res.end(data);
    };
}

const server = function () {
    function app(request, response) {
        // 每次请求都需要执行的
        changeRes(response);
        // 获取路由地址
        let pathname = url.parse(request.url).pathname, method = request.method.toLowerCase();
        let _method = '_' + method;
        // 根据路由渲染
        if (G[_method][pathname]) {
            if (method === 'post') {
                let result = '';
                // 接收客户端`post`请求
                request.on('data', function (data) {
                    result += data;
                });
                // 接收请求完毕
                request.on('end', function (err, chunk) {
                    if (err) throw err;
                    // response.end(result);
                    G[_method][pathname](request, response);
                });
            } else {
                G[_method][pathname](request, response);
            }
        } else {
            response.end('404');
        }
    }

    // get请求 -- 注册方法(有请求的时候会触发)
    app.get = function (url, callback) {
        G._get[url] = callback;
        // callback = function (request, response) {};
    };

    // post请求 -- 注册方法(有请求的时候会触发)
    app.post = function (url, callback) {
        G._post[url] = callback;
    };

    return app;
};

module.exports.app = server();