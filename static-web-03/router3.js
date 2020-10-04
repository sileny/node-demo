const http = require('http');
const ejs = require('ejs');

let app = require('./app').app;

http.createServer(app).listen(8000, 'localhost', () => {
    console.log('server is running at 8000');
});

// usage
// 1、注册路由请求
app.get('/', function (request, response) {
    // response.end('index');
    ejs.renderFile('./views/index.ejs', {
        html: '<h2>escape html</h2>'
    }, function (err, data) {
        if (err) throw err;
        // 返回内容
        response.send(data);
    });
});
app.get('/login', function (request, response) {
    // response.end('login');
    ejs.renderFile('./views/form.ejs', {}, function (err, data) {
        if (err) throw err;
        // 返回内容
        console.log(data);
        response.send(data);
    });
});
app.post('/dologin', function (request, response) {
    response.send('<script>console.log("login succeed")</script>');
});
app.get('/register', function (request, response) {
    response.end('register');
});