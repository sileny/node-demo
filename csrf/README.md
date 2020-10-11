# csurf


## options

可选的options对象，该对象可能包含以下任何键：

### cookie

确定是否应将用户的令牌机密存储在 `cookie` 或 `req.session` 中。将令牌密钥存储在 `cookie` 中可实现双重提交 [`cookie` 模式](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#double-submit-cookie)。默认为 `false`。

设置为 `true`（或 `cookie` 可选的对象参数）时，模块将更改行为，并且不再使用 `req.session`。这意味着您不再需要使用会话中间件。相反，您确实需要在该中间件之前使用应用程序中的 `cookie` 解析器中间件。

设置为对象时，将启用秘密的 `cookie` 存储，并且该对象包含此功能的选项（设置为 `true` 时，将使用选项的默认值）。这些选项可能包含以下任一键：

- `key`-用于存储令牌密钥的cookie的名称（默认为 `'_csrf'`）。
- `path`-cookie的路径（默认为 `'/'`）。
- `signed`-指示是否应该对cookie进行签名（默认为 `false`）。
- `secure`-将cookie标记为仅与HTTPS一起使用（默认为 `false`）。
- `maxAge`-Cookie过期的秒数（默认为会话长度）。
- `httpOnly`-将cookie标记为只能由Web服务器访问（默认为 `false`）。
- `sameSite`-为cookie设置相同的站点策略（默认为 `false`）。可以将其设置为 `'strict'`，`'lax'`，`'none'` 或 `true`（映射为 `'strict'`）。
- `domain`-设置cookie有效的域（默认为当前域）。

### ignoreMethods

禁用 `CSRF` 令牌检查的方法的数组。默认为 `['GET'，'HEAD'，'OPTIONS']`。

### sessionKey

确定会话对象位于请求上的属性（`key`）。默认为 `session`（即可以通过 `req.session` 查看）。此库中的CSRF机密已存储并读取为 `req[sessionKey].csrfSecret`。

如果 `cookie` 选项不为 `false`，则此选项不执行任何操作。

### value

提供中间件将调用的功能，以从请求中读取令牌以进行验证。该函数称为 `value（req）`，并期望以字符串形式返回令牌。

默认值是从以下位置按顺序读取令牌的函数：

- `req.body._csrf` - 通常由 `body-parser` 模块生成。
- `req.query._csrf` - `Express`中的内置项，可从URL查询字符串中读取。
- `req.headers ['csrf-token']` - `CSRF-Token` HTTP请求标头。
- `req.headers ['xsrf-token']` - `XSRF-Token` HTTP请求标头。
- `req.headers ['x-csrf-token']` - `X-CSRF-Token` HTTP请求标头。
- `req.headers ['x-xsrf-token']` - `X-XSRF-Token` HTTP请求标头。

# examples

```js
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const bodyParser = require('body-parser');
const express = require('express');
 
// setup route middlewares
const csrfProtection = csrf({ cookie: true });
const parseForm = bodyParser.urlencoded({ extended: false });
 
// create express app
const app = express();
 
// parse cookies
// we need this because "cookie" is true in csrfProtection
app.use(cookieParser());
 
app.get('/form', csrfProtection, function (req, res) {
  // pass the csrfToken to the view
  res.render('form', { csrfToken: req.csrfToken() })
});
 
app.post('/process', parseForm, csrfProtection, function (req, res) {
  res.send('data is being processed');
})
```

具体案例为 `./basic.js`，可以执行以下命令运行

```
npm run basic
```

当每次请求 `http://localhost:3000/form` 时，`csurf` 模块会生成一个包含 24 个字符的唯一ID，也就是 `token`，会绑定到 `req.session._csrf` 上。

刷新 `http://localhost:3000/form`，可以看到隐藏的名称为 `_csrf` 表单输入框，`<input type="hidden" name="_csrf" value="JZJ4IwYV-1iwKKJgoK4Qrj_LhxS4yDjS4ne4">`

`token` 放在隐藏的表单项里，在提交的时候，会验证这个 `token`。验证成功后，会跳转到 `/process` 路由

# using ajax

可以将 token 放在某个元素上
```js
const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

// Make a request using the Fetch API
fetch('/process', {
  credentials: 'same-origin', // <-- includes cookies in the request
  headers: {
    'CSRF-Token': token // <-- is the csrf token as a header
  },
  method: 'POST',
  body: {
    favoriteColor: 'blue'
  }
});
```

## Ignoring Routes

**注意** 仅应针对您希望来自网站外部的请求禁用CSRF检查，可以按照下面的方式过滤某些路由

不对某些路由使用 `csrf` 验证

```js
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const bodyParser = require('body-parser');
const express = require('express');
 
// create express app
const app = express();
 
// create api router
const api = createApiRouter();
 
// mount api before csrf is appended to the app stack
// 在csrf之前添加
app.use('/api', api);
 
// now add csrf and other middlewares, after the "/api" was mounted
// 确保`body-parser`和`cookie-parser`在csrf之前
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(csrf({ cookie: true }));
 
app.get('/form', function (req, res) {
  // pass the csrfToken to the view
  res.render('form', { csrfToken: req.csrfToken() })
});
 
app.post('/process', function (req, res) {
  res.send('csrf was required to get here')
});
 
function createApiRouter () {
  const router = new express.Router();
 
  router.post('/getProfile', function (req, res) {
    res.send('no csrf to get here')
  });
 
  return router
}
```

具体案例为 `./app.js`，可以执行以下命令运行

```
npm run dev
```

# error handler

自定义错误处理
```js
// error handler
app.use(function (err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);
 
  // handle CSRF token errors here
  res.status(403);
  res.send('form tampered with');
})
```
