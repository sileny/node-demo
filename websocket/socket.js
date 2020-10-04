const WS = require('ws');

/**
 * 这么写：因为`module.exports = WebSocket`
 *
 * WebSocket类上有三个类属性: Server(WebSocketServer) | Receiver | Sender
 *
 * WebSocketServer extends EventEmitter
 * `
 * constructor (options, callback) {
 *   // ...
 *   if (options.port == null && !options.server && !options.noServer) {
 *     throw new TypeError('missing or invalid options');
 *   }
 *   // ...
 * }
 * `
 */

const express = require('express');
const server = express();

server.set('view engine', 'ejs');

server.get('/', (req, res) => res.render('index'));
server.get('/web', (req, res) => res.render('web'));

server.listen(8080, 'localhost', () => console.log('server is running at 8080'));

// websocket连接8080服
const ws = new WS.Server({ port: 8000, server });
ws.on('connection', (socket) => {
  // console.log(socket);
  socket.on('message', msg => console.log(msg));
  socket.send('socket send to client');
});

// 验证是否允许访问
function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}

// 监听来自8080服务请求
ws.on('request', function(request) {
  // 对请求进行鉴权
  if (!originIsAllowed(request.origin)) {
    // Make sure we only accept requests from an allowed origin
    request.reject();
    console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
    return;
  }

  const connection = request.accept('echo-protocol', request.origin);
  console.log((new Date()) + ' Connection accepted.');
  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      console.log('Received Message: ' + message.utf8Data);
      connection.sendUTF(message.utf8Data);
    }
    else if (message.type === 'binary') {
      console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
      connection.sendBytes(message.binaryData);
    }
  });
  connection.on('close', function(reasonCode, description) {
    console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
  });
});

setInterval(() => {
  if (ws.clients) {
    ws.clients.forEach(client => {
      client.send(`interval message ${ Date.now() }`);
    });
  }
}, 1000);

