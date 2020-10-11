# session-redis

`redis` 结合 `express-session` 实现会话认证

```js
const express = require('express');
const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session); // 保证redis对express-session的正确引用
const favicon = require('serve-favicon');

const options = {
  host: 'localhost',
  client: redis.createClient()
};

const port = 3000;

express()
  .use(favicon(__dirname + '/nodejs.ico')) // 每次刷新浏览器，都会请求`favicon`，防止每次访问让views加2
  .use(session({
    store: new RedisStore(options),
    secret: 'keyboard secret',
    resave: false,
    saveUninitialized: true
  }))
  .use((req, res) => {
    req.session.views = req.session.views || 0;
    req.session.views++;

    res.setHeader('Content-Type', 'text/plain;charset=utf8');
    res.end(`views：` + req.session.views);
  })
  .listen(port, () => console.log(`app is running at ${ port }`));

```

- `secret` 是否对会话用的 `cookie` 进行签名
- `resave` 所有请求都要保存会话，即便没有发生变化也要保存。后台做存储可能会使用到会话信息
- `saveUninitialized` 表示即便没有要保存的值，也要创建会话。如果想要遵循保存 `cookie` 之前征求用户同意法则，可以把这项关掉。


