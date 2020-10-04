const fs = require('fs');

// 异步的方式获取的数据(结果可能返回的是undefined或null)
function getMime(extName) {
    fs.readFile('./mime.json', function (error, data) {
        if (error) return error;
        // 读取数据
        let result = JSON.parse(data.toString());
        return result[extName];
    });
}

// 返回undefined
console.log(getMime('.css'));