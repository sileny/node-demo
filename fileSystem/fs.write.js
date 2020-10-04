const fs = require('fs');

fs.open('./temp/hello.txt', 'r+', (err, fd) => {
    if (err) throw err;

    // usage:
    //  fs.write(fd, buffer[, offset[, length[, position]]], callback);
    // OR
    //  fs.write(fd, string[, position[, encoding]], callback);

    // const bf = Buffer.alloc(10);
    // `hello`被改成`he  o`
    // fs.write(fd, bf, 0, 6, 2, (err, bytesWritten, buffer) => {
    //     if (err) throw err;
    //     console.log(bytesWritten);
    //     console.log(buffer);
    // });

    // 同步方式写入
    // fs.write(fd, string[, position[, encoding]], callback) --> 官方api
    fs.write(fd, 'value to be written in', 6, 'utf8', (err, bytesWritten, buffer) => {
        if (err) throw err;
        console.log(bytesWritten);
        console.log(buffer);
    });

    // 关闭文件
    fs.close(fd, function (err) {
        if (err) throw err;
        console.log(arguments);
    });
});