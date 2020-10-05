const fs = require('fs');
const events = require('events');

class Watcher extends events.EventEmitter {
  constructor(watchDir, processedDir) {
    super();
    this.watchDir = watchDir;
    this.processedDir = processedDir;
  }

  start() {
    // 监视文件变化
    fs.watchFile(this.watchDir, () => {
      // 有变化的时候执行watch方法
      this.watch();
    });
  }

  watch() {
    // 读取目录下的文件
    fs.readdir(this.watchDir, (error, files) => {
      if (error) throw error;
      for (let i = 0; i < files.length; i++) {
        // 发射事件，处理文件
        this.emit('process', files[i]);
      }
    });
  }
}

module.exports = Watcher;
