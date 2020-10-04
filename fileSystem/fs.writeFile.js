const fs = require('fs');
// fs.copyFile('./temp/world.txt', './temp/writeFile.txt', err => {
//     if (err) throw err;
//
//     // fs.writeFile('./temp/writeFile.txt', 'another words need to be written in', err => {
//     //     if (err) throw err;
//     //     console.log('file has been written in and saved');
//     // });
//
//     // 等价于下面的写法
//
//     fs.writeFile('./temp/writeFile.txt', '需要写入的文字', 'utf8', err => {
//         if (err) throw err;
//         console.log('file has been written in and saved');
//     });
// });

// 当然，也可以去掉copyFile这一步，writeFile时会检查文件是否存在，不存在则创建并写入
fs.writeFile('./temp/writeFileTest.txt', 'test writeFile', err => {
    if (err) throw err;
    console.log('test success');
});

fs.writeFileSync('./temp/writeFileTest.txt', 'write file sync \n', (err) => {
    if (err) throw err;
    console.log('write succeed');
});