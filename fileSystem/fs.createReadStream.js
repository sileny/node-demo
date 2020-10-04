const fs = require('fs');

// 要读取的文件
let fst = fs.createReadStream('./temp/read-stream.txt');

let result = '';
let count = 0;

// 监听读取的数据
fst.on('data', function (chunk) {
    count++;
    result += chunk;
});

// 读取完成
fst.on('end', function () {
    console.log(count);
    console.log(result);
});

// 读取失败
fst.on('error', function (error) {
    console.log(error);
});
