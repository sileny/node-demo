let dbUrl = 'mongodb://127.0.0.1:27017/';
const MongoClient = require('mongodb').MongoClient;

// --------------- 1、连接数据库后进行什么操作(增/删/改/查) ---------------
function connectDb(dbName, callback) {
    // 1、连接数据库
    MongoClient.connect(dbUrl, function (err, db) {
        if (err) throw err;
        // 2、使用数据库
        let dbo = db.db(dbName);
        // 3、增加 删除 修改 查询(搜索关键字`(err, db, dbo)`)
        callback(err, db, dbo);
    });
}

// --------------- 3、根据查询条件查询数据库表后返回结果 ---------------
exports.find = function (dbName, collection, query, callbackResult) {
    // --------------- 2、连接数据库后查询数据 ---------------
    connectDb(dbName, (err, db, dbo) => {
        if (err) throw err;
        // 3、查询
        dbo.collection(collection).find(query).toArray((error, result) => {
            // 关闭数据库连接
            db.close();
            // --------------- 4、返回结果(对应于`app.js`的`(error, result)`) ---------------
            callbackResult(error, result);
        });
    });
    // 1、连接数据库
    // MongoClient.connect(dbUrl, function (err, db) {
    //     if (err) throw err;
    //     // 使用数据库
    //     let dbo = db.db(dbName);
    //     // 2、插入数据
    //     dbo.collection(collection).find(query).toArray((error, result) => {
    //         console.log(result);
    //         // 操作完成关闭数据库
    //         db.close();
    //         callback(error, result);
    //     });
    // });
};

// 插入数据到数据库表后返回插入的结果
exports.insert = function (dbName, collection, data, callbackResult) {
    // --------------- 连接数据库表后插入数据 ---------------
    connectDb(dbName, (err, db, dbo) => {
        dbo.collection(collection).insertOne(data, (error, result) => {
            // 关闭数据库
            db.close();
            // 返回结果
            callbackResult(error, result);
        });
    });
};

// 修改数据库表内容后返回结果
exports.update = function (dbName, collection, oldData, newData, callbackResult) {
    connectDb(dbName, (err, db, dbo) => {
        if (err) throw err;
        dbo.collection(collection).updateOne(oldData, {$set: newData}, (error, result) => {
            // 关闭数据库连接
            db.close();
            // 返回结果
            callbackResult(error, result);
        });
    });
};

exports.del = function (dbName, collection, query, callbackResult) {
    connectDb(dbName, (err, db, dbo) => {
        if (err) throw err;
        // 连接集合
        dbo.collection(collection).deleteOne(query, (error, result) => {
            // 关闭数据库连接
            db.close();
            // 返回结果
            callbackResult(error, result);
        });
    });
};