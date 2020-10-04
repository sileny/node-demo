const fs = require('fs');

let writeStream = fs.createWriteStream('./temp/write.txt');

// 写入内容
writeStream.write('写入的第一行内容', 'utf8');

for (let i = 1; i < 10; i++) {
    let date = new Date();
    writeStream.write(`\n${date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.toTimeString()}写入的第${i + 1}行内容`, 'utf8');
}

// 标记写入完毕，会广播finish事件
writeStream.end();
writeStream.on('finish', function () {
    console.log('write finish');
});

writeStream.on('error', function (error) {
    if (error) throw error;
    console.log('success');
});


// -------------------------管道流的方式写入--------------------------
console.log('---------------------------------------------------');

// 创建可读流
let readStream = fs.createReadStream('./temp/read-stream.txt');
// 创建可写流
let writeStream2 = fs.createWriteStream('./temp/output.txt');
// 管道读写流：把读取到的read-stream.txt的内容写入到output.txt内
readStream.pipe(writeStream2);

// 文件流转存
// https://zhuanlan.zhihu.com/p/25367269