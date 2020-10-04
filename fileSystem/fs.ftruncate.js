const fs = require('fs');

// 同步读取文件
console.log(fs.readFileSync('./temp/truncate.txt', 'utf8'));// node.js

// 获取文件标志
const fd = fs.openSync('./temp/truncate.txt', 'r+');
// 截断内容
fs.ftruncate(fd, 4, err => {
    if (err) throw err;
    console.log(fs.readFileSync('./temp/truncate.txt', 'utf8'));// node
});
