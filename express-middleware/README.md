# express

- [query](#query)
- [params](#params)
- [set](#set)
- [render-template](#render-template)
- [render数据到模板](#render-data-to-template)
- [static静态资源目录](#static)
- [middleware](#middleware)
- [body-parser](#body-parser)
- [cookie-parser](#cookie-parser)
- [express-session](#express-session)
- [使用mongo和express-session实现会话缓存](#mongo)

### query

接收 `query` 查询字符串
```js
const express = require('express');
const app = new express();

// get传值
// http://localhost:3000/product?pid=123
app.get('/product', (request, response) => {
    let query = request.query;
    console.log(query);
    response.send(query.pid);
});

app.listen(3000, 'localhost', () => console.log('server is running at 3000'));
```

### params

接收动态路由参数
```js
const express = require('express');
const app = new express();

// 动态路由
app.get('/news-content/:nid', (request, response) => {
    console.log(request.params);
    response.send(request.params.nid);
});

app.listen(3000, 'localhost', () => console.log('server is running at 3000'));
```

### set

配置模板引擎

```js
const express = require('express');
const app = express();

/**
 * 1、npm install express
 * 2、npm install ejs
 * 3、配置模板引擎
 */
// 配置ejs模板引擎
app.set('view engine', 'ejs');

// 设置模板的位置：在views目录下。默认模板引擎的位置在`views`目录下。
// app.set('views', __dirname + '/views');

app.get('/', function (req, res) {
    // 渲染`index.ejs`，相当于ejs.renderFile('./views/index.ejs')
    res.render('index');
});

app.listen(3000, 'localhost', () => console.log('server is running at 3000'))
```

### render-template

默认情况下，会使用 `ejs` 为默认的模板引擎
```js
const express = require('express');
const app = express();
app.get('/', function(req, res, next) {
  res.render('index');
});
app.listen(3000);
```

如果，需要使用别的模板引擎，可以更改配置，如，将模板引擎改为 `pug`

先安装 `pug` 依赖
```
npm install pug
```

然后，配置模板引擎

```js
app.set('view engine', 'pug');

app.get('/', function(req, res, next) {
  res.render('index');
});
```
此时，将会将按照 `pug` 的规则渲染模板


### render-data-to-template

渲染数据到模板里

- `render('index', { data: [] })` 通过 `render` 的参数传递数据到 `template` 里
- `res.locals` 传递请求层面的数据
- `app.locals` 传递程序应用层面的数据

默认情况下，`express` 在初始化的时候，会初始化一个 `app.settings = {}`，程序级的变量。如果设置 `app.set('title', 'Application title')`，那么在模板里可以访问到

```ejs
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><%= settings.title %></title>
</head>
<body>
<h1>Welcom <%= settings.title %></h1>
</body>
</html>
```

### static

- 使用真实的磁盘目录为静态资源目录

```js
const express = require('express');
const app = express();

app.use(express.static('public'));
// 如果静态资源存放于多个目录下，可以多次调用express.static中间件
app.use(express.static('files'));

app.get('/', (req, res) => res.render('使用真实的磁盘目录为静态资源目录'));
app.listen(3000, 'localhost', () => console.log('server is running at 3000'));
```

`app.use(express.static('public'))` 表示设置静态资源地址为磁盘下的与当前执行的 `js` 文件所在相同目录下的 `public` 目录，`views` 目录下的 `ejs` 文件在发起 `.js`、`.css`等静态资源请求，会去 `public` 目录下去找，访问资源的方式如 `http://localhost:3000/loading.gif`

如果静态资源存放于多个目录下，可以多次调用 `express.static` 来配置中间件


- 使用虚拟的目录为静态资源目录

```js
const express = require('express');
const app = express();

app.use('/static', express.static('public'));

app.get('/', (req, res) => res.render('使用虚拟的目录为静态资源目录'));
app.listen(3000, 'localhost', () => console.log('server is running at 3000'));
```

虽然没有 `static` 目录，但是当请求 `static` 目录下的文件时，会去 `public` 目录下查找

资源引用方式需要修改为 `localhost:3000/static/loading.gif`，这和上面的 `localhost:3000/loading.gif` 是一样的

`html` 方式的引用也是类似，
```html
<img src="images/loading.gif" />
```

### middleware

原理参考[connect-demo#principle](https://github.com/sileny/node-demo/tree/main/connect-demo#principle)

### body-parser

消息解析器，用来接收 MIME-encoded 主体部分

由于 `express` 实现的方法太多，`body-parse` 被单独分理出一个模块

常用的请求主体配置

```
// 1、处理 x-www-form-urlencoded 请求主体
app.use(express.urlencoded({extended: false}));

// 2、使用body-parser中间件处理json请求
app.use(express.json());

// 3、bodyParser.raw()--解析二进制格式
// 4、bodyParser.text()--解析文本格式
```

- `limit` 限制请求体大小

`body-parser` 的 `limit` 参数是用来限制过大的请求的，其默认值是 `100k`，如果需要接收更大的表单，需要修改这个参数值。

为什么需要限制，过大的请求会造成服务器压力，甚至废掉服务器。

下面的 `server.js` 模拟服务端程序
```js
const connect = require('connect');
const bodyParser = require('body-parser');

connect()
  .use(bodyParser.json({ extended: false, limit: 999999 }))
  .use((req, res, next) => { console.log('ok'); })
  .listen(3000);
```

下面写一个攻击性的程序
```js
const http = require('http');
const req = http.request({
  method: 'post',
  port: 3000,
  headers: { 'Content-Type': 'application/json' }
});
req.write('[');
let n = 3000;
while(n--) {
  req.write('"foo",');
}
req.write('"bar"');
req.end();
```


### cookie-parser

处理请求里的 `cookie` 信息

案例：
- `app-7-use-cookie-parser.js`
- `app-8-use-cookie-parser.js`
- `app-9-use-cookie-parser.js`

`cookie-parser` 参数解析

- 第一参数：key
- 第二参数：value
- 是个对象，包含以下属性
  - `domain`: 可以实现域名共享cookie。`www.google.com` 是顶级域名，`news.google.com`、`email.google.com` 等是二级域名，如果要实现域名共享cookie，那么可以这样写: `{domain: '.google.com'}`
  - `expires/maxAge`: 设置cookie超时时间。`{maxAge：60000}` 相当于 `{expires: new Date(Date.now() + 60000)}`
  - `httpOnly`: 设置为 `true`，表示只可以在服务端操作，客户端js无法操作，可以防止 `xss` 攻击。
  - `path`: 设置cookie起作用的路径。`{path: '/news'}` 则只会在路径为`/news`时起作用。
  - `secure`：如果指定了 `secure` 为 `true`，只有在 `https` 里才可以看到，在 `http` 里是无效的。
  - `singed`：对cookie进行 `签名`，设置为 `true`，那么需要使用 `response.signedCookies` 来访问，`response.cookies` 是访问不到的。被篡改的 `cookie` 会被服务器拒绝，并且将 `cookie` 设置为初始值。可以有效 `防止中间人攻击`


### express-session

客户端首次访问服务端会创建一个 `session` 对象，该对象会被拷贝到 `request` 属性上，通过 `request.session` 访问到。

再次访问服务端时，会接收到客户端携带的 `key`，服务端可以根据 `key` 返回内容到客户端。可以用来做数据权限校验

```js
// app-10-express-session.js
const express = require('express');
const session = require('express-session');
const app = express();

// 1、使用中间件
app.use(session({
    secret: 'keyboard',// 随意写，作为服务端生成session的签名
    resave: false,
    saveUninitialized: false,// false表示未声明则客户端不会保存session；声明但未初始化
    // name: "you can call it another name", // 保存在客户端的cookie的名字，默认是connect.sid。可以设置为自己定义的。
    // cookie: {secure: true}// https才可以使用
    cookie: {// 这里跟cookie一致
        maxAge: 60000
    },
    rolling: true // 表示直到没有请求时才开始计算过期时间
}));

// 3、获取session
app.get('/', (req, res) => {
    if (req.session.username) {
        res.send('欢迎回来：' + req.session.username);
    } else {
        res.send('未登录');
    }
});

// 2、设置session
app.get('/login', (req, res) => {
    req.session.username = '张三';
    res.send('登陆成功');
    console.log(req.session)
});

app.listen(3000, 'localhost', () => console.log('server is running at 3000'));
```

上面对登录信息进行了 `session` 存储，必要时，需要销毁 `session`，比如，用户退出系统后，需要销毁数据

使用 `req.sesson.destroy(callback?)` 进行 `session` 的销毁，案例在 `app-11-express-session.js`


### mongo

使用 `mongo` 和 `express-session` 实现 `session` 缓存

案例在 `web-express/app-12-connect-mongo.js`
