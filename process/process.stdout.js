// 将输入的数据输出到输出流

// 要求用户输入两个数值，然后把和输出到终端
let num1, num2;
process.stdout.write('输入第一个值：');
process.stdin.on('data', function (chunk) {
    if (!num1) {
        num1 = Number(chunk);
        process.stdout.write('输入第二个值：');
    } else {
        num2 = Number(chunk);
        process.stdout.write('两个数值的结果：' + (num1 + num2));

        // 打印结果后退出
        process.exit();
    }
});
/**
 * 两个值对应两个变量；
 * 用户输入的值被放入到回调函数的参数里(即,chunk)
 */
