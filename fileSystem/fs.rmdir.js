const fs = require('fs');

fs.rmdir('./temp/mkdir', err => {
    if (err) throw err;
    console.log('删除文件夹成功');
});