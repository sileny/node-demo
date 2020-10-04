const fs = require('fs');
/**
 * fs.stat 检测是文件还是目录
 *      mode: 33206 --> file
 *      mode: 16822 --> directory
 */
// 返回文件的状态信息：右键文件属性看到的内容
fs.stat('./temp/readFile.txt', (err, stats) => {
    if (err) throw err;
    console.log(stats);
    console.log(stats.isFile());
});

fs.stat('./temp', function (err, stats) {
    if(err) throw err;
    console.log(stats.mode);
    console.log(stats.isDirectory());
});

// 同步方式
const fileResult = fs.statSync('./temp/readFile.txt');
console.log(fileResult);