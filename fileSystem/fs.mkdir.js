const fs = require('fs');

// 与之相对的是fs.rmdir
fs.mkdir('./temp/mkdir', err => {
    if (err) throw err;
    console.log(`创建文件夹成功`);
});

// 如果已经创建了该目录，重复执行，会报错
// 解决方式
function tryMkdir() {
    try {
        fs.accessSync('./temp/mkdir');
    } catch (e) {
        fs.mkdirSync('./temp/mkdir');
    }
}
