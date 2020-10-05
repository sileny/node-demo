# publish-subscribe-system

简单的发布订阅系统

- [on](#on)
- [once](#once)
- [emit](#emit)
- [pub-sub-01](#pub-sub-01)
- [pub-sub-02](#pub-sub-02)
- [error](#error)

### on

使用 `on` 实现事件监听

当有客户端连接上来时，就会创建一个 `socket`。

`socket` 是一个事件发射器，可以使用 `on` 方法添加相应的事件，事件名称可以自定义，比如，下面的例子就是定义一个数据监听方法

```js
// on.js
const net = require('net');

const server = net.createServer(socket => {
  socket.on('data', data => {
    socket.write(data);
  });
});

server.listen(8888);
```

命令运行 `echo` 服务器

```
node ./on.js
```

通过 `telnet` 将数据发送到服务器，数据会通过 `socket.write(data)` 回传到 `telnet` 会话中

### once

使用 `once` 响应一次事件

```js
const net = require('net');

const server = net.createServer(socket => {
  socket.once('data', data => {
    socket.write(data);
  });
});

server.listen(8888);
```

### emit

下面的代码定义了一个带事件发射器的例子，对加入的人做出响应。

```js
const EventEmitter = require('events').EventEmitter;
const channel = new EventEmitter();
channel.on('join', () => { console.log('Welcome') });
```

上面的 `console.log('Welcome')` 不会被打印出来，因为没有执行发射器事件。

使用 `emit` 发射事件
```js
channel.emit('join');
```

### pub-sub-01

一个简单的发布订阅demo，内容在 `01.js` 里
```js
const events = require('events');
const net = require('net');

const channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};
channel.on('join', function(id, client) {
  this.clients[id] = client;
  this.subscriptions[id] = (senderId, message) => {
    if (id !== senderId) { // 不将telnet发送方出去的数据回传到自己的telnet
      this.clients[id].write(message);
    }
  };
  this.on('broadcast', this.subscriptions[id]);
});

const server = net.createServer(cilent => {
  const id = `${client.remoteAddress}:${client.remotePort}`;
  channel.emit('join', id, client);

  cilent.on('data', data => {
    data = data.toString();
    channel.emit('broadcast', id, data);
  });
});
server.listen(8888);
```

`node 01.js` 运行服务器，新打开一个命令行窗口，输入 `telnet 127.0.0.1 8888`进入聊天程序，再次使用同样的命令打开俩 `telnet`窗口。在其中的任意一个窗口输入内容，都会被服务器接收，然后，发送到别的窗口里

### pub-sub-02

在 `pub-sub-01` 的基础上添加对 `close` 和 `shutdown` 事件的监听

```js
const events = require('events');
const net = require('net');

const channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};
channel.on('join', function(id, client) {
  this.clients[id] = client;
  this.subscriptions[id] = (senderId, message) => {
    if (id !== senderId) { // 不将telnet发送方出去的数据回传到自己的telnet
      this.clients[id].write(message);
    }
  };
  this.on('broadcast', this.subscriptions[id]);
});
channel.on('leave', function(id) {
  channel.removeListener('broadcast', this.subscriptions[id]);
  channel.emit('boradcast', id, `${id} has left.`
});
channel.on('shutdown', function() {
  channel.emit('broadcast', '', 'The server has shutdown');
  channel.removeAllListeners('broadcast');
});

const server = net.createServer(cilent => {
  const id = `${client.remoteAddress}:${client.remotePort}`;
  channel.emit('join', id, client);

  cilent.on('data', data => {
    data = data.toString();
    if (data === 'shutdown\r\n') { // 输入的shutdown
      channel.emit('shutdown');    // 发射shutdown命令
    }
    channel.emit('broadcast', id, data);
  });
  client.on('close', () => {
    channel.emit('leave', id);
  });
});
server.listen(8888);
```

此时，在 `telnet` 客户端输入 `shutdown` 后回车，参与的所有聊天的人将会被踢出去

### error

监听错误
```js
const events = require('events');

const emitter = new events.EventEmitter();
emitter.emit('error', new Error('Something is wrong'));
emitter.on('error', error => console.log(`Error message: ${error.message}`));
```

如果发射出去的事件没有第二参数的 `error` 对象，栈跟踪会抛出一个 `uncaughtException` 的错误，而且会立即停止程序，该错误会用一个被废弃掉的方法来处理

```js
process.on('uncaughtException', err => {
  console.log(err);
  process.exit(1);
});
```
