const fs = require('fs');

// 多次执行，内容会被重复追加
fs.appendFile('./temp/appendFile.txt', '\nwords need to be appended', err => {
    if (err) throw err;
    console.log('append succeed');

    // 如果文件描述符被指定为 file，则不会被自动关闭
    // fs.close();
});