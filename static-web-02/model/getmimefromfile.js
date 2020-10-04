exports.getMime = function (fs, extName) {  /*获取后缀名的方法*/
    // 把读取数据改成同步
    let data = fs.readFileSync('./mime.json');
    // data.toString() 转换成json字符串
    // 把json字符串转换成json对象
    let Mimes = JSON.parse(data.toString());
    return Mimes[extName] || 'text/html';
};