// process.nextTick(callback[, args])
// 该方法将callback添加到next tick队列，
// 一旦当前事件轮询队列的任务全部完成，
// 在next tick里的callback会被依次调用。
// 会在任何I/O事件（包括定时器）之前运行

setTimeout(function () {
    console.log(`晚于process.nextTick执行`);
}, 0);

console.log('this log first executed');
process.nextTick(() => {
    console.log(`当另外2个log执行完毕后会立即执行nextTick回调函数`);
});
console.log('this log second executed');
