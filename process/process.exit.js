// 两种清空下`exit`事件会被触发。
// 1、显示调用`process.exit()`方法，使得node.js进程即将结束；
// 2、node.js事件循环数组里不再有额外的工作，使得Node.js进程即将结束。

process.on('exit', (code) => {
    console.log(`即将退出，退出码为${code}`);
});

// `exit`监听器的回调函数，只允许包含同步操作。
process.on('exit', (code) => {
    console.log('这行log会打印出来');

    // 异步的回调函数不会执行
    setTimeout(function () {
        console.log('这里的代码永远不会执行');
    }, 0);
});
