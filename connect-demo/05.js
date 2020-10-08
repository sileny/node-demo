const connect = require('connect');
const errorHandler = require('./error-handler');

connect()
  .use((req, res) => {
    foo(); // 默认的处理是返回响应状态码500，真正的应用程序里，一般还会做相应的处理
    res.setHeader('Content-Type', 'text/plain');
    res.end('hello');
  })
  .use(errorHandler) // 使用自定义的错误处理中间件
  .listen(3000);
