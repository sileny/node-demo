const connect = require('connect');

connect()
  .use((req, res) => {
    foo(); // 默认的处理是返回响应状态码500，真正的应用程序里，一般还会做相应的处理
    res.setHeader('Content-Type', 'text/plain');
    res.end('hello');
  })
  .listen(3000);
