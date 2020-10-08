# connect

`connect` 以前是 `express` 的基础。只用 `connect` 也是可以的做出完整的web程序。

- [基本demo](#basic-demo)
- [运行机制](#principle)
- [写一个可配置的中间件](#write)
- [默认的错误处理](#error-default)
- [自定义处理错误](#error-handler)

### basic-demo
安装依赖
```
npm i connect
```

下面是一个 `connect` 的简单案例

```js
// 01.js
const app = require('connect')();
app.use((req, res, next) => {
  res.end('hello');
});
app.listen(3000);
```

传入 `app.use` 的是一个中间件，中间件是 `connect` 和 `express` 的基础。下面来介绍其中的原理(principle)。

### principle

connect 中间件就是一个 javascript 函数，这个函数一般会有三个参数：请求对象、响应对象，以及一个名称为 `next` 的回调。当需要执行后续的中间件的时候，需要调用这个 `next` 回调，将控制权交还给分派器。

在中间件运行之前，`connect` 会用分派器接管请求对象，然后，交给第一个中间件处理。然后，根据需要，执行 `next` 回调。不执行 `next` 回调，能停止中间件的后续执行，可以利用该特征实现权限的校验。

下面定义了俩中间件，第一个有执行 `next` 回调，第二个没有，因为，此时后续没有对应的中间件业务需要处理，所以，不需要将控制权交还给分派器。

```js
// 02.js
const connect = require('connect');
function logger(req, res, next) {
  console.log('s% s%', req.method, req.url);
  next();
}
function hello(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.end('hello middleware');
}
connect()
  .use(logger)
  .use(hello)
  .listen(3000);
```

如果，调整了中间件 `logger` 和 `hello` 的执行顺序，

```js
// 03.js
connect()
  .use(hello)
  .use(logger)
  .listen(3000);
```
由于 `hello` 中间件没有执行 `next` 回调，那么，后续的 `logger` 中间件将不会执行。

### write

写一个可配置的中间件，为了做到可配置，中间件都会遵循一个简单的惯例：用一个函数返回另外一个函数。

具体格式如下，
```js
function setup(options) {
  // 配置业务
  return function(req, res, next) {
    // 中间件业务逻辑（这里还是可以访问闭包内的options）
  };
}
```

### error-default

```javascript
// 04.js
const connect = require('connect');

connect()
  .use((req, res) => {
    foo(); // 调用了一个没有声明的方法
    res.setHeader('Content-Type', 'text/plain');
    res.end('hello');
  })
  .listen(3000);

```

报错信息为 `localhost/:1 GET http://localhost:3000/ 500 (Internal Server Error)`

上面的中间件调用了一个未声明的方法，默认的处理是返回响应状态码 `500`，真正的应用程序里，一般还会做相应的处理

### error-handler

默认的处理是返回响应状态码 `500`，会将错误信息输出到外部，真正的应用程序里，一般不会将敏感信息暴漏给潜在的攻击者

自定义错误处理
```js
const env = process.env.NODE_ENV || 'development';

function errorHandler(err, req, res, next) {
  res.statusCode = 500;
  switch (env) {
    case 'development':
      console.log('error', err);
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(err));
      break;
    default:
      res.end('Server error');
  }
}

module.exports = errorHandler;
```

使用中间件

```js
const connect = require('connect');
const errorHandler = require('./error-handler');

connect()
  .use((req, res) => {
    foo();
    res.setHeader('Content-Type', 'text/plain');
    res.end('hello');
  })
  .use(errorHandler) // 使用自定义的错误处理中间件
  .listen(3000);
```
