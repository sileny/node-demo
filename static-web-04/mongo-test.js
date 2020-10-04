const http = require('http');
const ejs = require('ejs');
const app = require('./app').app;
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

http.createServer(app).listen(8000);

/**
 * 路由就是根据不同的请求渲染不同的页面。
 *
 * 当浏览器路径为`/`，则渲染`views/index.ejs`页面
 *
 * 代码运行过程：
 * 为`/`绑定一个方法，即function(request, response) { ..ejs.renderFile()}
 * 当客户端请求地址为`/`，则会根据请求地址做出对应的get/post响应(此时会绑定send方法)，
 * 然后，调用function(request, response){}
 */
app.get('/', function (request, response) {
    let msg = '这是数据库数据';
    ejs.renderFile('./views/index.ejs', {
        // 需要渲染的数据
        msg: msg
    }, function (err, data) {
        if (err) throw err;
        // 返回响应
        response.send(data);
    });
});

app.get('/add', function (request, response) {
    let dbUrl = 'mongodb://127.0.0.1:27017/';
    // 1、连接数据库
    MongoClient.connect(dbUrl, function (err, db) {
        assert.equal(null, err);
        // 使用数据库
        let dbo = db.db('test');
        // 2、插入数据
        dbo.collection('user').insertOne({
            name: 'node',
            age: 7
        }, function (error, data) {
            assert.equal(null, error);
            console.log(data);
            // 操作完成关闭数据库
            db.close();
        });
    })
});

app.get('/addBatch', function (request, response) {
    let dbUrl = 'mongodb://localhost:27017';
    // 连接数据库
    MongoClient.connect(dbUrl, function (err, db) {
        assert.equal(null, err);
        // 使用数据库
        let dbo = db.db('test');
        // 插入多条数据
        dbo.collection('user').insertMany([
            {name: 'hua1', age: 12, status: 'open'},
            {name: 'hua2', age: 17, status: 'close'},
            {name: 'hua3', age: 14, status: 'open'},
            {name: 'hua4', age: 22, status: 'open'}
        ], function (error, data) {
            assert.equal(null, error);
            // 获取插入的数据
            let result = data.ops;
            // 把新添加的数据返回到页面
            ejs.renderFile('./views/list.ejs', {
                data: result
            }, function (renderError, renderData) {
                assert.equal(null, renderError);
                console.log(renderData);
                // 数据返回到前端
                response.send(renderData);
            });
            // 关闭数据库连接
            db.close();
        });
    })
});

// 显示数据库所有内容
app.get('/all', function (request, response) {
    let dbUrl = 'mongodb://localhost:27017/';
    // 连接数据库
    MongoClient.connect(dbUrl, (err, db) => {
        assert.equal(null, err);
        // 使用数据库
        let dbo = db.db('test');
        // 查询数据库表
        dbo.collection('user').find().toArray(function (error, result) {
            assert.equal(null, error);
            console.log(result);
            // 显示到页面
            ejs.renderFile('./views/all.ejs', {
                data: result || []
            }, (err, result) => {
                assert.equal(null, err);
                // 返回到前端
                response.send(result);
            });
            // 关闭数据库连接
            db.close();
        });
    });
});
