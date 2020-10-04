// ---------- response.render ----------
const express = require('express');
const app = express();

app.set('view engine', 'ejs');

// 设置静态web服务地址
// 表示把当前`app5.js`所在同级的public目录作为静态web服务地址
// 更详细点，就是，渲染`views`目录下的ejs文件时候所请求的样式文件和图片、js等都从public目录去拿
// app.use(express.static('public'));
// 浏览器端可以这么访问
// http://localhost:3000/loading.gif

// 如果静态资源存放于多个目录下，可以多次调用express.static中间件
app.use(express.static('files'));

// 设置虚拟静态web目录
// 虽然没有static目录,但是当请求static目录下的文件时，会去public目录下查找。
app.use('/static', express.static('public'));
// localhost:3000/static/loading.gif
// 等价于
// localhost:3000/loading.gif
// <img src="images/loading.gif" />

app.get('/', (req, res) => res.render('app4'));
app.listen(3000, 'localhost', () => console.log('server is running at 3000'));