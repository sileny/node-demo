
const fs = require('fs');

fs.open('./temp/hello.txt', 'r', (err, fd) => {
    if(err) throw err;
    /**
     * fd: 被打开的文件的标识
     * buffer: 数据将被写入到的 buffer。
     * offset: 是 buffer 中开始写入的偏移量。
     * length 是一个整数，指定要读取的字节数。
     * position: 指定从文件(fd文件)中开始读取的位置。
     *      如果 position 为 null，则数据从当前文件读取位置开始读取，且文件读取位置会被更新。
     *      如果 position 为一个整数，则文件读取位置保持不变。
     * callback: (err, bytesRead, buffer)
     */
    // 分配10个字节的buffer
    const buf = Buffer.alloc(10);
    fs.read(fd, buf, 5, 2, null, (err, bytesRead, buffer) => {
        if(err) throw err;
        // 读取到的字节数
        console.log(bytesRead);
        // 打印打出来的结果buffer
        console.log(buffer);
    });
});