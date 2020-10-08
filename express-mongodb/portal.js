const express = require('express');
const app = express();

app.use(express.static('./portal'));

// 请求源
const WHITE_LIST = ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://192.168.0.120:8080'];

// 判断origin是否在域名白名单列表中
function isOriginAllowed(origin, allowedOrigin) {
  if (Array.isArray(allowedOrigin)) {
    for (let i = 0; i < allowedOrigin.length; i++) {
      if (isOriginAllowed(origin, allowedOrigin[i])) {
        return true;
      }
    }
    return false;
  } else if (typeof allowedOrigin === 'string') {
    return origin === allowedOrigin;
  } else if (allowedOrigin instanceof RegExp) {
    return allowedOrigin.test(origin);
  } else {
    return !!allowedOrigin;
  }
}

app.use(function (req, res, next) {
  const origin = req.headers.origin;
  if (isOriginAllowed(origin, WHITE_LIST)) {
    // 允许进行跨域访问的前端地址，因为利用npm run dev启动vue程序，默认的端口是8080，所以，
    // 这里设置允许http://localhost:8080地址可以对服务器内容进行跨域访问
    res.header('Access-Control-Allow-Origin', origin);
    // 允许进行跨域访问的方法，这里主要用到的是GET和POST两种方法。
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    // 允许前端进行跨域访问的头部列表，程序需要进行用户名认证，所以这里设置为'Content-Type,Authorization'
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    // 发送Ajax时，Request header中便会带上 Cookie 信息。
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  } else {
    res.send({code: 9999, msg: 'invaild request'});
  }
});

app.get(function (req, res, next) {
  next();
});

const resultIndex = [{
  imgUrl: 'https://m2.cn.bing.com/az/hprichbg/rb/SpringtimeinGiverny_ZH-CN8223989854_1920x1080.jpg',
  id: Date.now()
}, {
  imgUrl: 'https://m2.cn.bing.com/az/hprichbg/rb/Love_ZH-CN11474763511_1920x1080.jpg',
  id: Date.now()
}, {
  imgUrl: 'https://m2.cn.bing.com/az/hprichbg/rb/FalcoPeregrinus_ZH-CN12522703608_1920x1080.jpg',
  id: Date.now()
}];

app.get('/', (req, res, next) => {
  res.json(resultIndex);
});

app.get('/ott/info', (req, res, next) => {
  console.log(resultIndex);
  res.json(resultIndex);
});

app.get((req, res, next) => {
  res.redirect('/');
});

app.listen(8000, 'localhost', () => console.log('portal server is running at 8000 port'));
