// process.argv返回的是一个数组，
// 第一元素是node.js的安装/执行路径，
// 第二元素是代码所在的文件路径；剩余为其他命令行参数(带参运行的参数)。
process.argv.forEach((value, index) => {
    console.log(`${value}, ${index}`);
});


// D:\code\nodejs\demo\process>node process.argv.js one two three

// 带参数运行的结果如下：
// D:\Program Files\nodejs\node.exe, 0 --> execPath
// D:\code\nodejs\demo\process\process.argv.js, 1 --> 文件路径
// one, 2 --> 以下都是命令行传参
// two, 3
// three, 4