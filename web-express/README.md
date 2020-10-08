# express

- [query](#query)
- [params](#params)
- [set](#set)
- [render](#render)
- [static静态资源目录](#static)
- [middleware](#middleware)
- [body-parser](#body-parser)
- [cookie-parser](#cookie-parser)
- [express-session](#express-session)
- [mongo](#mongo)

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

### render

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
