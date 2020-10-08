const express = require('express');

const app = express();

const MongoClient = require('mongodb').MongoClient;

app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
    // 1、连接数据库
    MongoClient.connect('mongodb://127.0.0.1:27017', (error, db) => {
        if (error) throw error;
        // console.log(db);
        // 2、使用数据库
        const dbo = db.db('test');
        // 3、从那个集合里查找数据
        dbo.collection('product').find().toArray((err, result) => {
            if (err) throw err;
            // console.log(result);
            res.render('product', {
                list: result
            });
            // 关闭数据库
            db.close();
        });
    });
});

app.listen(3000, 'localhost', () => console.log('3000 port'));