const fs = require('fs');

// 事件
const events = require('events');
let eventEmitter = new events.EventEmitter();
/**
 * 事件驱动方式(代码调用的方式)获取异步的数据
 */

function getMime() {
    fs.readFile('./mime.json', function (error, data) {
        if (error) throw error;
        // 发送广播
        eventEmitter.emit('mimeType', data);
    });
}

// 接收广播
eventEmitter.on('mimeType', function (data) {
    console.log(data.toString());
});

// 需要执行一次
getMime();