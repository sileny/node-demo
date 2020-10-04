const fs = require('fs');

/**
 * fs的所有方法都有同步和异步形式。
 *
 * 异步方法的最后一个参数都是一个回调函数。
 * 传给回调函数的参数取决于具体方法，但回调函数第一参数都会保留异常。如果成功，则第一参数为null或undefined。
 *
 * 同步时任何异常都会被立即抛出。可以使用try/catch来处理异常。
 * 何为同步？一步一步地执行，有一步不满足条件就退出。例如，if(true) return;
 *
 * 异步的方法不能保证执行顺序。如果前后有顺序上的依赖，那么，应该把回调链起来
 */

fs.rename('./tmp', './temp', err => {
    if (err) throw err;
    fs.stat('./temp', (err, stats) => {
        if (err) throw err;
        console.log(`文件属性：${JSON.stringify(stats)}`);
    })
});

