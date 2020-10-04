var fs = require("fs");
var readLine = require("readline");

/**
 * 按行读取文件内容
 *
 * @param fileName 文件名路径
 * @param callback 回调函数
 *
 * @return 字符串数组
 */
function readFileToArr(fileName, callback) {
    var arr = [];
    var readObj = readLine.createInterface({
        input: fs.createReadStream(fileName)
    });

    // 一行一行地读取文件
    readObj.on('line', function (line) {
        arr.push(line);
    });
    // 读取完成后,将arr作为参数传给回调函数
    readObj.on('close', function () {
        callback(arr);
    });
}

// 读取数据后,处理完成后放入outpu.txt
readFileToArr('./temp/hello.txt', function (arr) {
    // 通过回调得到的,按行获得的数据
    console.log(arr);

    var tempArr = [];

    arr.forEach((ele) => {
        tempArr.push(ele, '\n');
    });
    fs.appendFile('./temp/readline.txt', tempArr.join(""),
        function (err) {
            if (err) throw err;
        });
});
