const events = require('events');

// 利用events模块的EventEmitter类来绑定和监听事件
let eventEmitter = new events.EventEmitter();

// ---------- 广播和接收广播 ----------

// 监听广播(接收)
eventEmitter.on('to_parent', function (data) {
    console.log('接收到了广播事件', data);
});

// 广播
setTimeout(function () {
    eventEmitter.emit('to_parent', '广播：打电话的内容');
}, 2000);

/**
 * 稍微详细点的例子：打电话。
 * 我打电话给父母，那么，由我的号码发出的讯号就是广播的id标志(在这里相当于`to_parent`)。
 * 电话那头的父母通过讯号标志来接听我的声音。
 */

