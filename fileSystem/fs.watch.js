const fs = require('fs');

// 第二个参数是可选的。 如果提供的 options 是一个字符串，则它指定了 encoding。 否则 options 应该以一个对象传入。
// 监听器回调有两个参数 (eventType, filename)。 eventType 可以是 'rename' 或 'change'，filename 是触发事件的文件的名称。
// 注意，在大多数平台，当一个文件出现或消失在一个目录里时，'rename' 会被触发。
// 还需要注意，监听器回调是绑定在由 fs.FSWatcher 触发的 'change' 事件上，但它跟 eventType 的 'change' 值不是同一个东西。

fs.watch('./temp/watch.txt', (eventType, filename) => {
    console.log(`事件类型是: ${eventType}`);
    if (filename) {
        console.log(`提供的文件名: ${filename}`);
    } else {
        console.log('未提供文件名');
    }
});