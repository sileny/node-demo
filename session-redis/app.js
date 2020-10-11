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

    res.setHeader('Content-Type', 'text/plain;charset=utf8'); // 支持中文
    res.end(`views：` + req.session.views);
  })
  .listen(port, () => console.log(`app is running at ${ port }`));
