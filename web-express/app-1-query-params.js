const express = require('express');
let app = new express();

app.get('/', (request, response) => response.end('express'));
app.get('/news', (request, response) => response.end('news'));

// 动态路由
app.get('/news-content/:nid', (request, response) => {
    console.log(request.params);
    response.send(request.params.nid);
});

// get传值
// http://localhost:3000/product?pid=123
app.get('/product', (request, response) => {
    let query = request.query;
    console.log(query);
    response.send(query.pid);
});

app.listen(3000, 'localhost', () => console.log('server is running at 3000'));