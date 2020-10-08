const MongoClient = require('mongodb').MongoClient;
const dbUrl = 'mongodb://127.0.0.1:27017';

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('try /add | /delete | /remove | /update');
});

app.get('/add', function (req, res) {
    MongoClient.connect(dbUrl, (error, db) => {
        if (error) throw error;
        // 1、使用数据库
        const dbo = db.db('test');
        // 2、查询集合
        dbo.collection('product').insertOne({
            name: 'insert-1',
            price: 123,
            img: 'insert-1.png'
        }, (err, data) => {
            if (err) throw err;
            console.log(data.result, data.ops);
            res.send(JSON.stringify(data));
            // 关闭数据库
            db.close();
        });
    });
});

app.get('/add-many', function (req, res) {
    MongoClient.connect(dbUrl, (error, db) => {
        if (error) throw error;
        // 1、使用数据库
        const dbo = db.db('test');
        // 2、查询集合
        dbo.collection('product').insertMany([{
            name: 'insert-1',
            price: 123,
            img: 'insert-1.png'
        }, {
            name: 'insert-1',
            price: 123,
            img: 'insert-1.png'
        }, {
            name: 'insert-1',
            price: 123,
            img: 'insert-1.png'
        }], (err, data) => {
            if (err) throw err;
            console.log(data.result, data.ops);
            res.send(JSON.stringify(data));
            // 关闭数据库
            db.close();
        });
    });
});

app.get('/delete', (req, res) => {
    MongoClient.connect(dbUrl, (error, db) => {
        if (error) throw error;
        // 1、使用数据库
        const dbo = db.db('test');
        // 2、查询集合
        dbo.collection('product').deleteOne({
            img: /insert/
        }, (err, data) => {
            if (err) throw err;
            console.log(data);
            res.send(data);
            // 关闭数据库
            db.close();
        });
    });
});

app.get('/delete-many', (req, res) => {
    MongoClient.connect(dbUrl, (error, db) => {
        if (error) throw error;
        // 1、使用数据库
        const dbo = db.db('test');
        // 2、查询集合
        dbo.collection('product').deleteMany({
            img: /insert/
        }, (err, data) => {
            if (err) throw err;
            console.log(data);
            res.send(data);
            // 关闭数据库
            db.close();
        });
    });
});

app.get('/remove', (req, res) => {
    MongoClient.connect(dbUrl, (error, db) => {
        if (error) throw error;
        // 1、使用数据库
        const dbo = db.db('test');
        // 2、查询集合
        dbo.collection('product').removeOne({
            img: /insert/
        }, (err, data) => {
            if (err) throw err;
            console.log(data);
            res.send(data);
            // 关闭数据库
            db.close();
        });
    })
});

app.get('/remove-many', (req, res) => {
    MongoClient.connect(dbUrl, (error, db) => {
        if (error) throw error;
        // 1、使用数据库
        const dbo = db.db('test');
        // 2、查询集合
        dbo.collection('product').removeMany({
            img: /insert/
        }, (err, data) => {
            if (err) throw err;
            console.log(data);
            res.send(data);
            // 关闭数据库
            db.close();
        });
    })
});

app.get('/update', (req, res) => {
    MongoClient.connect(dbUrl, (error, db) => {
        if (error) throw error;
        // 1、使用数据库
        const dbo = db.db('test');
        // 2、查询集合
        dbo.collection('product').updateOne({
            img: /insert/
        }, {
            $set: {
                img: 'update.png'
            }
        }, (err, data) => {
            if (err) throw err;
            console.log(data);
            res.send(data);
            // 关闭数据库
            db.close();
        });
    });
});

app.get('/update-many', (req, res) => {
    MongoClient.connect(dbUrl, (error, db) => {
        if (error) throw error;
        // 1、使用数据库
        const dbo = db.db('test');
        // 2、查询集合
        dbo.collection('product').updateMany({
            img: /insert/
        }, {
            $set: {
                img: 'update.png'
            }
        }, (err, data) => {
            if (err) throw err;
            console.log(data);
            res.send(data);
            // 关闭数据库
            db.close();
        });
    });
});

app.get('/count', (req, res) => {
    MongoClient.connect(dbUrl, (error, db) => {
        if (error) throw error;
        // 连接数据库
        const dbo = db.db('test');
        // 2、查询集合
        dbo.collection('product').find({}).count(function (err, count) {
            if (err) throw err;
            console.log(count);
            // 3、关闭数据库
            db.close();
        });
    });
});

app.get('/find', (req, res) => {
    MongoClient.connect(dbUrl, (error, db) => {
        if (error) throw error;
        // 1、连接数据库
        const dbo = db.db('test');
        // 2、查询集合
        dbo.collection('product').find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            res.json(result);
        });
    });
});

app.listen(3000);