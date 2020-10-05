/**
 * 聊天服务器：
 *
 * 客户端进入，服务端会对响应请求做处理，触发服务端的join事件
 *
 * 注意：里面的事件名称`join`、`broadcast`是随意取的
 */
const events = require('events');
const net = require('net');
const port = 8888;

const channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = [];

// ** 1：服务员接待客人 **
channel.on('join', function (id, client) {
  // `发布方`收集`数据消息接收方`
  // 记录收集到的数据
  this.clients[id] = client;

  this.subscriptions[id] = (senderId, message) => { // ** 7：厨师烧菜烧饭 **
    console.log(`senderId是 ${senderId}，接收到的消息是 ${message}`);
    if (id !== senderId) {
      this.clients[id].write(message);
    }
  };
  // 接收广播
  this.on('broadcast', this.subscriptions[id]);
});

// ** 9：监听客户离开 **
channel.on('leave', function (id) {
  // 客户离开后的清理工作
  channel.removeListener('broadcast', this.subscriptions[id]);
  channel.emit('broadcast', id, `${ id } has left.`);
});

// ** 10：停止服务 **
channel.on('showdown', () => {
  channel.emit('broadcast', '', 'The server has shutdown');
  // 移除掉事件监听
  channel.removeAllListeners('broadcast');
});

// 服务端接收数据请求
// ** 0：店家开店，等待接待客人 **
const server = net.createServer(client => { // ** 2：接到一个个客户 **
  // 在接收到请求之后获取客户端的数据
  const id = `${ client.removeAddress }:${ client.remotePort }`; // ** 3：了解到这个客户来自哪里【实际场景，是客户坐在店里哪个桌号】 **

  // 根据标记缓存数据
  channel.emit('join', id, client); // ** 4：服务员对来自那里的客户进行标记【实际场景，记录哪个桌号坐哪个客户】 **

  // 监听数据消息
  client.on('data', data => { // ** 5：客户点餐 **
    data = data.toString();
    console.log(`client 收到消息：`, data);

    if (data === 'shutdown\r\n') {
      // 发送关闭命令
      channel.emit('shutdown');
    }

    // 向订阅方发送数据消息（实际就是执行`订阅方`的方法）
    channel.emit('broadcast', id, data); // ** 6：服务员告诉厨师几号餐桌要吃什么 **
  });

  // 关闭的监听
  client.on('close', () => {
    channel.emit('leave', id); // ** 8：客户离开 **
  })
});

server.listen(port, () => console.log(`app is running at ${ port }`));

/**
 * 整个过程其实就像是你去饭店吃饭。
 *
 * - 你就是客户，你有你的数据信息，比如，来自哪里，这段程序里面就是来自某一个ip地址
 * - 服务员对你的订餐信息做一个记录，记录你要吃什么
 * - 厨师接到订单，开始一顿忙碌，做好了后告诉服务端端菜
 * - 清理工作
 *
 * 整个过程涉及到几类角色：店家/服务员/厨师/消费者
 *
 * 一个消费者明面上对应两种角色：店家/服务员/厨师，实际上不一定能看到厨师。
 * 服务的两端就是`消费者`和`生产者`，分别对应的是`客户`和`厨师`
 */
