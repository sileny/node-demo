const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const bodyParser = require('body-parser');
const express = require('express');

const port = 3000;

// create express app
const app = express();

// 设置模板引擎
app.set('view engine', 'ejs');

// create api router
const api = createApiRouter();

// mount api before csrf is appended to the app stack
// 在csrf之前添加不受crsf验证的路由
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

function createApiRouter() {
  const router = new express.Router();

  router.use((req, res, next) => {
    console.log(`路由跳转成功~~~`, Date.now());
    next();
  });

  router.post('/getProfile', function (req, res) {
    res.send('no csrf to get here');
  });

  router.get('/exclude', function (req, res) {
    res.send('here is no csrf valid');
  });

  return router
}

app.listen(port, () => console.log(`app is running at ${ port }`));
