const fs = require('fs');

// 第一次执行删除
fs.unlink('./temp/unlink.txt', err => {
    if (err) throw err;
    console.log('删除成功');
});

// 第二次执行删除会报错：no such file or directory, unlink 'D:\code\nodejs\demo\fileSystem\temp\unlink.txt'
// fs.unlink('./temp/unlink.txt', err => {
//     if (err) throw err;
//     console.log('删除成功');
// });
