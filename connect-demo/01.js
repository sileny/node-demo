const app = require('connect')();

app.use((req, res, next) => {
  res.end('hello');
});

app.listen(3000);
