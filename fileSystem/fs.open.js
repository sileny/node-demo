const fs = require('fs');
/**
 * fs.open(path, flags, mode, callback)
 * path: 路径
 * flags: 读/写 `r, r+, rs+; w, w+, wx, wx+; a, a+, ax, ax+`
 * mode: 读/写/执行 4/2/1 (可不写)
 * callback: (err, fd)
 *      err: 成功则返回null/undefined
 *      fd: 被打开文件的标识(类似于定时器标识) --> (成功:Integer/失败:undefined)
 */
fs.open('./temp/hello.txt', 'r', (err, fd) => {
    if (err) throw err;
    console.log(fd);
});