const fs = require('fs');

fs.copyFile('./temp/hello.txt', './temp/world.txt', err => {
    if (err) throw err;

    // 异步地读取一个文件的全部内容。
    // 如果`options`没有指定编码，则默认返回原始的buffer。
    // 如果第二参数指定了编码(如`utf8`)，则返回编码后的内容。
    fs.readFile('./temp/world.txt', 'utf8'/* options */, (err, data/* 读取到的数据 */) => {
        if (err) throw err;
        console.log(data);
    })
});