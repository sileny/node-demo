const fs = require('fs');
// 同步打开(例如打开数据库获取数据之后再进行操作)

// 同步打开文件(会阻塞后续代码执行)
const fd = fs.openSync('./temp/world.txt', 'r');
console.log(fd);
console.log(`如果读取失败，则不会执行这里的代码`);