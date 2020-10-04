const fs = require('fs');

// 根据文件后缀名返回mime类型
function getMime(extName) {
    // 异步可能获取的结果为undefined
    // fs.readFile('./mime.json', function (err, data) {
    //     if (err) {
    //         console.log('mime.json不存在');
    //         return false;
    //     }
    //     // 读取的内容为Buffer的16进制数据, 需要调用toString来转换为对象
    //     console.log(data, data.toString());
    //
    //     let types = JSON.parse(data.toString());
    //     return types[extName] || 'text/html';
    // });

    // 同步获取数据
    let result = fs.readFileSync('./mime.json');
    let types = JSON.parse(result.toString());
    return types[extName] || 'text/html';
}

module.exports.getMime = getMime;