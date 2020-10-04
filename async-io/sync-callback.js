const fs = require('fs');

// 一个客户连接就创建一个线程。一个线程大概占用2M。
// 8G内存的服务器可以同时连接的最大用户数为4000个左右。
// node.js处理的大约为4000个

// 利用回调函数处理异步带来的问题
function getMime(callback) {
    fs.readFile('./mime.json', function (error, data) {
        if (error) throw error;
        if (typeof callback === 'function') {
            // 什么时候拿到数据，什么时候返回
            callback(data);
        }
    });
}

getMime(function (data) {
    console.log(data.toString());
});